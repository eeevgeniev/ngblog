const mongoose = require('mongoose');

let tagSchema = mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true }
});

let tag = mongoose.model('tag', tagSchema);

module.exports = tag;