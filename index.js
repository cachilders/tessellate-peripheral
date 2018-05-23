var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var noble = require('noble');
var os = require('os');
var reduce = require('lodash.reduce');
var request = require('request');

var postData = require('./controllers/post-data');

var RSSI_THRESHOLD = -90;
var EXIT_GRACE_PERIOD = 20000;
/* The whitelist is a temporary solution for nonexistent 
client code and an anemic gateway. I mean this thing is
basically nothing, but it'll be something big one day.
*/
var WHITELIST = [
  'A495'/* Bean */,
  '6E40'/* espruino micro:bit */
]; /* UUID prefix;  ALL-CAPS */
var inRange = {};

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  var services = peripheral.advertisement.serviceUuids;
  var id = peripheral.id;
  var entered = !inRange[id];
  if (services.length > 0 && WHITELIST.includes(services[0].slice(0, 4).toUpperCase())) {
    if (entered) {
      inRange[id] = {
        peripheral: peripheral
      };
    }
    inRange[id].lastSeen = Date.now();
  }
});

setInterval(function() {
  for (var id in inRange) {
    if (inRange[id].lastSeen < (Date.now() - EXIT_GRACE_PERIOD)) {
      delete inRange[id];
    }
  }
}, EXIT_GRACE_PERIOD / 2);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/tessellate', postData);


setInterval(() => {
  for (var id in inRange) {
    var peripheral = inRange[id].peripheral;
    var name = id.split(':').length === 1 ? id.match(/.{2}/g).join(':') : id;
    var message = peripheral.advertisement.localName;
    var payload = {
      name,
      message: message + ' via RPi3 JS BLE Gateway Prealpha',
    };
    var httpRequestOptions = {
      url: 'http://localhost:1976/tessellate',
      form: payload
    };
    console.log('Sending:', payload)
    request.post(httpRequestOptions, function(error, response, body){});
  }
}, 60000);

app.set('port', 1976);
app.listen(app.get('port'));
