'use strict'
const AWS = require("aws-sdk");
require('dotenv').config()
AWS.config.update({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

var sns = new AWS.SNS();
function publish() {
    let params = {
        Message: "This is test message.",
        PhoneNumber: "91 123456789" //mobile number with country code
     }
    sns.publish(params, (e, r) => {
        if (e) console.log(e);
        else console.log(r);
    })
    
}
publish();

