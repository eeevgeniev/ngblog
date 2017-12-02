const customSession = require('../passport/customSession');
const passport = require('passport');
const User = require('../models/user');

module.exports = {
    userRegister: (req, res, next) => {
        const parameters = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        if (!parameters.email || !parameters.username || !parameters.password) {
            return res.status(200).json({
                success: false,
                message: 'Email, username and password are required.',
              });
        }

        return passport.authenticate('customRegister', (error) => {
            if (error) {
                return res.status(200).json({
                    successful: false,
                    message: error
                });
            }

            return res.status(200).json({
                successful: true
            });
        })(req, res, next);
    },
    userLogin: (req, res, next) => {
        const parameters = {
            email: req.body.email,
            password: req.body.password
        };

        if (!parameters.email || !parameters.password) {
            return res.status(200).json({
                success: false,
                message: 'Email, username and password are required.',
              });
        }

        return passport.authenticate('customLogin', (error, token, user) => {
            if (error) {
                return res.status(200).json({
                    successful: false,
                    message: error
                });
            }

            return res.status(200).json({
                successful: true,
                token: token,
                username: user.username
            });
        })(req, res, next);
    },
    userGet: (req, res) => {

    },
    userLogout: (req, res) => {

    },
    userUpdate: (req, res) => {

    }
};