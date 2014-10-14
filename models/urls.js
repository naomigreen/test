var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var urlsSchema = Schema({

    url: String,
    file: String
    
    });


module.exports = mongoose.model('urls',urlsSchema);
