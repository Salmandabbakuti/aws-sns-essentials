var AWS = require('aws-sdk');
var util = require('util');
// configure AWS
AWS.config.loadFromPath("./config.json");
var sns = new AWS.SNS();

function createTopic() {
  sns.createTopic({
    'Name': 'SNS-Demo'
  }, function (err, result){
    if (err !== null) {
      console.log(util.inspect(err));
      console.log(err);
    }
    console.log(util.inspect(result));
    console.log(`Topic created with ARN: ${result.TopicArn}`);
    });
 }
createTopic()
