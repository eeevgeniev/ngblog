const mongoose = require('mongoose');

let roleSchema = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true }
});

let role = mongoose.model('role', roleSchema);

module.exports = role;