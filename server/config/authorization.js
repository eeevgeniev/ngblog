const passportLocalStrategy = require('passport-local').Strategy; 
const userRepository = require('../models/user');

module.exports = new passportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, email, password, done) => {
        
        const loginUser = {
            email: email,
            password: password,
            username: req.body.username.trim()
        }

        userRepository.findOne({email: loginUser.email}, (error, user) => {
            if (error) {
                // to do
                return;
            }

            //to do
        })
})