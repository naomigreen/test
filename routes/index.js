    var express = require('express');
    var router = express.Router();
    var urls= require('../models/urls');
   
    var screenshot = require('url-to-screenshot');
    var fs = require('fs');

router.post('/test', function(req, res){ 
   var url = new urls();
    url.url = req.body.url;
    url.file = req.body.file;
    

screenshot(url.url)
  .width(800)
  .height(600)
  .capture(function(err, img) {
    if (err) throw err;
    fs.writeFileSync(__dirname  + url.file + '.png', img);
    console.log('got image');
  });
 
url.save(function(err){
    if (err)
      res.send(err);
    res.redirect('/account');
    });
  
});
   
router.get('/test', function(req, res){
    res.render('test');
  });

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/register', function(req, res){
	res.render('register', {title:'Please complete the registration form'});
});

router.get('/login', function(req, res){
	res.render('login', {title:'Please login'});
	});


router.get('/url', function(req, res){
  res.render('url');
  });

module.exports = router;
