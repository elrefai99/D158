const router = require('express').Router(),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt'),
      passport = require('passport'),
      User = require('../model/User'),
      { forwardAuthenticated } = require('../config/AuthConfig');


// Get Login & Register
router.get('/sign-in',forwardAuthenticated, (req, res) => res.render('login'))
router.get('/sign-up',forwardAuthenticated, (req, res) => res.render('register'))

// Post data
router.post('/register', (req, res)=>{
    const { username, email, password, password2 } = req.body;

    let error = [];

    if(password != password2){ // Check password 
        error.push({msg: "please input currect password"});
    }
    if(password.length <= 6){ // Check password length
        error.push({msg: "please input password max = 6"});
    }
    if(error.length > 0){ // Check error length
        res.render('register', {
            error, username, email,password, password2
        })
    }else{
        User.findOne({email: email}) // Validation passed
            .then(result=>{
                if(result){
                    error.push({msg: "email is already registered"});
                    res.render('register', {// user exists
                        error, username, email,password, password2
                    })
                    res.status(400).json(error)
                }else{
                    const newUser =  User({username, email,password});
                    bcrypt.genSalt(10, (err, salt)=>{
                        bcrypt.hash(newUser.password, salt, (err, hash)=>{
                            if(err) throw err;
                            newUser.password = hash; // set password to hash
                            newUser.save()
                                .then(user => {
                                    //const token = createCookie(user._id);
                                    //res.cookie("__set", token, {httpOnly: true, expiresIn:maxAge * 1000});
                                    req.flash('success_msg', 'You are new user 😁')
                                    res.redirect('/sign-in')
                                    
                                })
                                .catch(err => console.log(err)); 
                        })
                        
                    })
                }
            });
    }
})
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});
module.exports = router;