const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
};