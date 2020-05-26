const express = require('express');
const bodyParser = require('body-parser');
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
        console.log('Here is the Notification: '+JSON.stringify(body));
        }

    if (payload.Type === 'SubscriptionConfirmation') {
      var params = {
	    Token: payload.Token,
	    TopicArn: process.env.TOPIC_ARN,
	    AuthenticateOnUnsubscribe:"true"
	    }
     sns.confirmSubscription(params, function(err, data){
        if(err !== null){
          console.log(err);
          }
         else {
          console.log('Subscription Confirmed:'+ JSON.stringify(data));
          res.end("Subscription Confirmed.")
         }
      });
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
