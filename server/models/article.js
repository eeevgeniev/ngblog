const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: "Article title is required.", unique: "There is article with this name" },
    text: { type: mongoose.Schema.Types.String, required: "Article title is required." },
    author: { type: mongoose.Schema.Types.String, required: true },
    created: { type: mongoose.Schema.Types.Date, required: true, default: Date.now },
    modified: { type: mongoose.Schema.Types.Date, required: true, default: Date.now },
    deleted: { type: mongoose.Schema.Types.Boolean, required: true, default: false },
    tags: [{ type: mongoose.Schema.Types.String }],
    images: [{ type: mongoose.Schema.Types.String }]
});

let article = mongoose.model('article', articleSchema);

module.exports = article;