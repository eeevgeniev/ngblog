const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const PassportLocalStrategy = require('passport-local').Strategy;
const encryption = require('../utilities/encryption');
const customSession = require('../passport/customSession');

module.exports = new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true 
    }, 
    (req, email, password, done) => {
        const loginData = {email, password};

        User.findOne({email: loginData.email}, (error, user) => {
            if (error || !user) {
                const error = new Error('Invalid password or email.')
                return done(error.name = 'Incorrect Credentials');
            }

            const verificationPassword = encryption.generatePassword(password, user.salt);

            if (user.password !== verificationPassword) {
                const error = new Error('Invalid password or email.')
                return done(error.name = 'Incorrect Credentials');
            }

            customSession.saveUser(user._id.toString(), user);
            const payload = {sub: user._id, counter: customSession.getCounter()};

            const token = jsonwebtoken.sign(payload, 'my secret data');

            return done(null, token, user);
        });
    }
);