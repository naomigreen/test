var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// img path
var imgPath = '/path/to/some/img.png';
 
// connect to mongo
mongoose.connect('localhost', 'testing_storeImg');
 
// example schema
var schema = new Schema({
    img: { data: Buffer, contentType: String }
});
 
// our model
var A = mongoose.model('A', schema);
 
mongoose.connection.on('open', function () {
  console.error('mongo is open');
 
  // empty the collection
  A.remove(function (err) {
    if (err) throw err;
 
    console.error('removed old docs');
 
    // store an img in binary in mongo
    var a = new A;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;
 
      console.error('saved img to mongo');
 