const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
app.use(bodyParser.json());

AWS.config.update({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});
// sns instance
var sns = new AWS.SNS();

app.get('/', async function (req, res) {
    
try{
  
  res.send(response)
}catch (err) {
    res.status(500).send(err)
  }    
})
app.listen(8080, () => { console.log('Server is running at 8080..') });
