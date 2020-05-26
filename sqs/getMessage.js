const AWS = require("aws-sdk");
require('dotenv').config()
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});
// sqs instance
var sqs = new AWS.SQS();
   function messages(){
    var params = {
    QueueUrl: process.env.SQS_URL
    };
 
 sqs.receiveMessage(params, function (err, data) {
   if (err) {
   console.log(err)
   }
   
     if(data.Messages===undefined){
      console.log('No new messages recieved..');   
     }
     else {
    let messages = JSON.stringify(data.Messages)
    console.log(`Recieved message(s): ${messages}`);
      }
  });
}
messages()
