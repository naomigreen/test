

module.exports = function (app, passport)
{

    app.get('/login', function(req, res) {
        res.render('login', { message: req.flash('message')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/account', 
        failureRedirect : '/login', 
        failureFlash : true 

        })
    );

    app.get('/register', function(req, res) {
        res.render('register', { message: req.flash('message')});
    });

    app.post('/register', passport.authenticate('local-register', {
        successRedirect : '/login',
        failureRedirect : '/register', 
        failureFlash : true 
        })

    );

     
    app.get('/account', isLoggedIn, function(req, res) {
        res.render('account', {user: req.user});
    });
   
    app.get('/test', isLoggedIn, function(req, res){
        res.render('test');
     });
    app.get('/images', isLoggedIn, function(req, res) {
        res.render('images', {user: req.user});
    });


    app.get('/logout', function(req, res) {
        req.session.destroy();
        req.logout();
        res.redirect('/');
    });

    app.get('/loginerror' , function(req,res) {
        console.log(req.flash('error'));
       res.redirect('/login');
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}



