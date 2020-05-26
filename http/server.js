const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const app = express();
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});
// sns instance
var sns = new AWS.SNS();

app.get('/', (req, res) => {
    var params = {
        Protocol: 'http', /* required */   //http , https ,application
        TopicArn: process.env.TOPIC_ARN, /* required */   // topic you want to subscribe
        Endpoint: req.query.endpoint, // the endpoint that you want to receive notifications.
        ReturnSubscriptionArn: true //|| false
    };

    sns.subscribe(params, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);

        }
    });
    res.end("Subscription Added and it is on its way for confirmation..");
});
app.post('/', (req, res) => {
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    let payload = JSON.parse(body);
    let msgType = req.headers['x-amz-sns-message-type'];
    if(msgType == 'Notification') {
        console.log('Notification has been sent to the endpoint by the sns');
        console.log('the body of the req object is: '+JSON.stringify(req.body));
        }

    if (payload.Type === 'SubscriptionConfirmation') {
      const promise = new Promise((resolve, reject) => {
        const url = payload.SubscribeURL

        request(url, (error, response) => {
          if (!error && response.statusCode == 200) {
            console.log('Subscription confirmed..')
            return resolve()
          } else {
            return reject()
          }
        })
      })

      promise.then(() => {
        res.end("ok")
      })
    }
  })
})

app.post('/publish', (req, res) => {
  let params = {
    Message: req.body.message,
    Subject: req.body.subject,
    TopicArn: process.env.TOPIC_ARN
  };

  sns.publish(params, function (err, data) {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });
  res.send('Message Published..')
});
app.listen(8080, () => { console.log('Server is running at 8080..') });
