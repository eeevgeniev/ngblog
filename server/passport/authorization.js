const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const customSession = require('../passport/customSession');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jsonwebtoken.verify(token, 'my secret data', (error, decoded) => {
        if (error) {
            return res.status(401).end();
        }

        let user = customSession.getUser(decoded.sub);

        if (!user) {
            return res.status(401).end();
        }

        req.user = user;

        return next();
    });
};