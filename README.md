# aws-sns-essentials
AWS SNS Setup and workaround Repository

##### Pre-requisites:
1. Create a topic and subscribers in that topic
```
node createTopic.js
```

2. Update ```config.json``` according to your created AWS SNS service

```
node createSubscription.js #create subscription in defined topic ARN from config.json
```

##### Quick Demo(Publishing):
```
git clone https://github.com/Salmandabbakuti/aws-sns-essentials.git
cd aws-sns-essentials
npm i
node publish.js //Main pub/sub service model

             (OR)
             
cd mobile
//update config.json in directory.
npm i
node app.js //mobile notification service irrespective of topic

```
