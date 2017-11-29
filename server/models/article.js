const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    text: { type: mongoose.Schema.Types.String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    created: { type: mongoose.Schema.Types.Date, required: true },
    modified: { type: mongoose.Schema.Types.Date, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tag' }],
    images: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'tag' }]
});

let article = mongoose.model('article', articleSchema);

module.exports = article;