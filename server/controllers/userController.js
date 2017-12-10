const customSession = require('../passport/customSession');
const passport = require('passport');
const User = require('../models/user');
const encryption = require('../utilities/encryption');

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

            return passport.authenticate('customLogin', (error, token, user) => {
                if (error) {
                    return res.status(200).json({
                        successful: false,
                        message: error
                    });
                }

                return res.status(200).json({
                    successful: true,
                    message: "",
                    token: token,
                    username: user.username
                });
            })(req, res, next);
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
                message: 'Email and password are required.',
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
                message: "",
                token: token,
                username: user.username
            });
        })(req, res, next);
    },
    userGet: (req, res) => {
        if (!req.user) {
            return res.status(200).json({
                success: false,
                message: "Invalid user.",
              });
        }

        return res.status(200).json({
            success: true,
            message: "",
            user: {
                username: req.user.username,
                email: req.user.email
            }
        });
    },
    userLogout: (req, res) => {
        customSession.clearUser(req.user._id);

        return res.status(200).json({
            success: true,
            message: "",
          });
    },
    userUpdate: (req, res) => {
        if (!req.body || !req.body['password'] || !req.body['confirmPassword']) {
            return res.status(200).json({
                success: false,
                message: "Password and confirm password are required.",
              });
        }

        User.findById(req.user._id, (error, user) => {
            if (error) {
                return res.status(200).json({
                    success: false,
                    message: error,
                  });
            }

            let newSalt = encryption.generateSalt();
            let newPassword = encryption.generatePassword(req.body['password'], newSalt);

            User.findByIdAndUpdate(user._id, { password: newPassword, salt: newSalt }, (error,  user) => {
                if (error) {
                    return res.status(200).json({
                        success: false,
                        message: error,
                      });
                }

                return res.status(200).json({
                    success: true,
                    message: "",
                });
            });
        });
    }
};