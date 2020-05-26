const AWS = require("aws-sdk");
require('dotenv').config()
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});
// sqs instance
var sqs = new AWS.SQS();

function sendMessage(){
var params = {
        MessageBody: 'Hello Devs!',
        QueueUrl: process.env.SQS_URL,
        DelaySeconds: 0
    };

    sqs.sendMessage(params, function(err, data) {
        if(err) {
            console.log(err);
        } 
        else {
            console.log(data);
        } 
    });
}
sendMessage()
