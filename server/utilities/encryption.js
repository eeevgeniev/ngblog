const crypto = require('crypto');

module.exports = {
    generateSalt: () => crypto.randomBytes(128).toString('base64'),
    generatePassword: (password, salt) => {
        return crypto
        .createHmac('sha256', salt)
        .update(password)
        .digest('hex');
    }
};