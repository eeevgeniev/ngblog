const User = require('../models/user');
const PassportLocalStrategy = require('passport-local').Strategy;
const encryption = require('../utilities/encryption');

module.exports = new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    },
    (req, email, password, done) => {
        const registerData = {
            email: email.trim(),
            password: password.trim(),
            username: req.body.username.trim()
        };

        let salt = encryption.generateSalt();
        let userPassword = encryption.generatePassword(registerData.password, salt);

        let user = {
            username: registerData.username,
            email: registerData.email,
            password: userPassword,
            salt: salt
        }

        User.create(user, (error, user) => {
            if (error) {
                return done(error.message);
            }

            return done(null);
        });
    }
);