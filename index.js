const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const os = require('os');

const postData = require('./controllers/post-data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/tessellate', postData);

let name = '';

if (os.networkInterfaces().eth0 && Array.isArray(os.networkInterfaces().eth0)) {
  const eth0 = os.networkInterfaces().eth0[0];
  if (eth0.mac) {
    name = eth0.mac.toString();
  }
}

const payload = {
  name,
  message: 'RPi JS Prealpha',
};

setInterval(() => {
  var httpRequestOptions = {
    url: 'http://localhost:1976/tessellate',
    form: payload
  };
  request.post(httpRequestOptions, function(error, response, body){});
}, 60000);

app.set('port', 1976);
app.listen(app.get('port'));
