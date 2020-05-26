const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
app.use(bodyParser.json());
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});
// sns instance
var sns = new AWS.SNS();

app.post('/', async function (req, res) {
  
  res.send('yet to implement')
    
})
app.post('/subscribe', (req, res) => {
  let params = {
    Protocol: 'HTTP', //or https
    TopicArn: process.env.TOPIC_ARN,
    Endpoint: req.body.endpoint
  };
  console.log(params)
  sns.subscribe(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.send(data);
    }
  });
});
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
