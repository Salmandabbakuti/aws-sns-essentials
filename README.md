# aws-sns-essentials
AWS SNS Setup and workaround Repository

##### Pre-requisites:
1. Create a Topic
> Update ```config.json``` according to your AWS Credentials
```
node createTopic.js
```
2. Add Subscribers in created Topic

- Update ```TopicArn``` in ```config.json``` according to your created AWS SNS service Topic.

```
node createSubscription.js  #creates subscription in defined topicARN from config.json
```
3. Confirm subscription in recieved email

##### Quick Demo(Publishing):
```
git clone https://github.com/Salmandabbakuti/aws-sns-essentials.git
cd aws-sns-essentials
npm i
//update config.json in directory.
node publish.js  #Main pub/sub service model -Email Subscriptions

             (OR)
             
cd mobile
//update config.json in directory.
npm i
node app.js #mobile notification service irrespective of topic

```
