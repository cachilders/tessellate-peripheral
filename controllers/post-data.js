var express = require('express');
var router  = express.Router();
var request = require('request');

var httpRequestOptions = {
  url: 'http://tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com/io/tessellate',
  json: true
};

router.post('/', function(req, res){
  httpRequestOptions.body = req.body;
  request.post(httpRequestOptions, function(error, response, body){
    res.send();
  })
})

module.exports = router;
