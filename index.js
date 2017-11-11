var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var os = require('os');
var reduce = require('lodash.reduce');
var request = require('request');

var postData = require('./controllers/post-data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/tessellate', postData);

var name = reduce(os.networkInterfaces(), (mac, net) => {
  if (!mac && Array.isArray(net) && net[0].mac) {
    if (reduce(net[0].mac.split(/:/), (sum, num) => {
      return sum + parseInt(num, 16)
    }, 0) > 0) {
      mac = net[0].mac;
    }
  }
  return mac;
}, '');

var payload = {
  name,
  message: 'Device-Agnostic JS Prealpha',
};

setInterval(() => {
  var httpRequestOptions = {
    url: 'http://localhost:1976/tessellate',
    form: payload
  };
  console.log('Sending:', payload)
  request.post(httpRequestOptions, function(error, response, body){});
}, 60000);

app.set('port', 1976);
app.listen(app.get('port'));
