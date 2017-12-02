const encryption = require('../utilities/encryption');
const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: [true, "Username is required."], unique: [true, "There is user with this name."] },
    email: { type: mongoose.Schema.Types.String, required: "Email is required.", unique: "There is user with this email." },
    password: { type: mongoose.Schema.Types.String, required: true },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }]
});

let user = mongoose.model('user', userSchema);

module.exports = user;