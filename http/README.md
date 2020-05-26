
##### SNS HTTP Example

##### Quick Demo:
>Update ```.env``` according to your SNS configuration

```
npm i
node server.js
```

##### Subscribe&Confirm Subscription:
```
curl http://localhost:8080?endpoint=<your preffered susbcriber endpoint public Ip>
``` 
##### Publish Message:
```
curl -d '{"subject":"Greetings","message":"Hello Devs, How are you all?"}' -H "Content-Type: application/json" -X POST http://localhost:8080/publish
```
##### Check Message Recieved on Endpoint:

<yet to be implmented>
  
