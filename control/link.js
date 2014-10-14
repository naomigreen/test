
var express = require('express');
var router = express.Router();
var urls = require('../models/urls');
var screenshot = require('url-to-screenshot');
var fs = require('fs');

screenshot('http://www.newlook.com/')
  .width(800)
  .height(600)
  .capture(function(err, img) {
    if (err) throw err;
    fs.writeFileSync(__dirname + '/working.png', img);
    console.log('working.png');
  });

module.exports = router;