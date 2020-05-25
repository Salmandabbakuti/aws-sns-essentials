var AWS = require('aws-sdk');
var util = require('util');
var config = require('./config.json');
// configure AWS
AWS.config.loadFromPath("./config.json");
var sns = new AWS.SNS();

function subscribe() {
  sns.subscribe(
  {
  'TopicArn': config.TopicArn,
  'Protocol': 'email',
  'Endpoint': '<email address>'
  }, function (err, result) {

    if (err !== null) {
      console.log(util.inspect(err));
    }

    console.log(util.inspect(result));
  });
 }
subscribe()
