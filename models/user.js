var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = Schema({

    username: {type: String, require: true, unique: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    firstname: String,
    surname: String,
    schedule:[{
        sitename: String,
    	url: String,
        details: String,
    
    }]
    
    });


module.exports = mongoose.model('user',userSchema);
