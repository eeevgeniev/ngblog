const mongoose = require('mongoose');
const Tags = require('../models/tag');

module.exports = (connectionString) => {
    mongoose.connect(connectionString, { useMongoClient: true });

    let database = mongoose.connection;

    database.once('open', (error) => {
        if (error) {
            console.log(error);
            return;
        }

        Tags.seedTags();

        console.log('Database ready.');
    });
};