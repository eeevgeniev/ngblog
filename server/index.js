const database = require('./config/database');
const express = require('express');
const expressConfig = require('./config/expressConfig');
const settings = require('./config/settings');
const router = require('./routing/router');

const app = express();

expressConfig(app);

database(settings.connectionString);

app.listen(settings.port, () => {
    console.log(`Server started at ${settings.port}.`);
});