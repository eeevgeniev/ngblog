const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const router = require('../routing/router');
const localLogin = require('../passport/customLogin');
const localRegister = require('../passport/customRegister');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(passport.initialize());
    app.use(cors());

    passport.use('customLogin', localLogin);
    passport.use('customRegister', localRegister);

    router(app);
};