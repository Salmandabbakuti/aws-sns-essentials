var AWS = require('aws-sdk');
var config = require('./config.json');

// configure AWS
AWS.config.loadFromPath("./config.json");
var sns = new AWS.SNS();

function publish() {
  var publishParams = { 
    TopicArn : config.TopicArn,
    Message: "This is Test message.."
  };

  sns.publish(publishParams, function(err, data) {
    process.stdout.write(".");
    console.log(data);
  });
}
publish();
