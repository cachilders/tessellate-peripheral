const tessel = require('tessel');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const os = require('os');

const blueLight = tessel.led[3];

const postData = require('./controllers/post-data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/tessellate', postData);

const payload = {
  ip: '',
  name: os.networkInterfaces().eth0[0].mac.toString(),
  message: 'Tessel Prealpha',
}

request('http://ifconfig.io/ip', function(error, response, ip) {
  payload.ip = ip;
});

setInterval(() => {
  blueLight.toggle();
  var httpRequestOptions = {
    url: 'http://localhost:1977/tessellate',
    form: payload
  };
  request.post(httpRequestOptions, function(error, response, body){});
  blueLight.toggle();
}, 60000);

app.set('port', 1977);
app.listen(app.get('port'), function(req, res){
  console.log('Express app listening on port:', app.get('port'));
});
