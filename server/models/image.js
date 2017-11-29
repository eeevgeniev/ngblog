const mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    path: { type: mongoose.Schema.Types.String, required: true }
});

let image = mongoose.model('image', imageSchema);

module.exports = image;