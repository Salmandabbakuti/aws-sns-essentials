const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('dotenv').config()
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});
// sqs instance
var sqs = new AWS.SQS();

app.get('/messages', (req, res) => {
    var params = {
    QueueUrl: process.env.SQS_URL
    };
 
 sqs.receiveMessage(params, function (err, data) {
   if (err) {
   console.log(err)
   };
   else {
   console.log(`Recieved message(s): ${data}`);
   res.send(`Recieved message(s): ${data}`)
   }
});
app.listen(8080, () => { console.log('Server is running at 8080..') });
