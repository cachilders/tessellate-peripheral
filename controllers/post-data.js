var express = require('express');
var router  = express.Router();
var request = require('request');

var httpRequestOptions = {
  url: 'http://tessellatecore-env.hfeqqqyqqv.us-east-1.elasticbeanstalk.com/io/tessellate',
  json: true
};

router.post('/', (req, res) => {
  httpRequestOptions.body = req.body;
  request.post(httpRequestOptions, (error) => res.send(error));
})

module.exports = router;
