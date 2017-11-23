const tessel = require('tessel');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const os = require('os');

const led = tessel.led;

const redLed = led[0].off();
const amberLed = led[1].off();
const greenLed = led[2].off();
const blueLed = led[3].off();

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
  message: 'Tessel 2 Prealpha',
};

setInterval(() => {
  var httpRequestOptions = {
    url: 'http://localhost:1977/tessellate',
    form: payload
  };
  amberLed.on();
  request.post(httpRequestOptions, (error) => {
    if (error) {
      redLed.on();
    } else {
      amberLed.off();
      if (redLed.isOn) redLed.off();
    }
  });
}, 60000);

app.set('port', 1977);
app.listen(app.get('port'));
