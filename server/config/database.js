const mongoose = require('mongoose');

module.exports = (connectionString) => {
    mongoose.connect(connectionString, { useMongoClient: true });

    let database = mongoose.connection;

    database.once('open', (error) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log('Database ready.');
    });
};