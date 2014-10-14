var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

    module.exports = function(passport) 
    {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user);
      });
    });  

    passport.use('local-register', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            findOrCreateUser = function() {
                User.findOne({'username' : username}, function(err, user) {
                    if (err) {
                        console.log('Error while registing: ' +err);
                        return done(err);
                    }
                    if (user) {
                        console.log('This account already exists');
                        return done(null, false, req.flash('message', 'Account already exists'));
                    
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = generateHash(password);
                        newUser.email = req.param('email');
                        newUser.firstname = req.param('firstname');
                        newUser.surname = req.param('surname');
                        newUser.save(function(err) {
                            if (err) {
                                console.log('Error while creating account: ' +err);
                                throw err;
                            }
                            console.log('Account registration complete');
                            return done(null, newUser);
                        });
                    } 
                });
            };

            process.nextTick(findOrCreateUser);
    })
);

    var generateHash = function(password, next) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};



    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true 
    },
    function(req, username, password, done) {
        console.log('Logging....');
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                if (err)
                    return done(err);

                if (!user){
                    console.log('incorrect username ' +username);
                    return done(null, false, req.flash('message', 'incorrect username.'));
                }

                if (!validPassword (user, password)){
                    console.log('incorrect password');
                    return done(null, false, req.flash('message', 'incorrect password'));
                }
                    
            return done(null, user);
        });
    })
);

    var validPassword = function(user, password){
         return bcrypt.compareSync(password, user.password);
    }

}