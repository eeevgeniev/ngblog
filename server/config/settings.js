const port = 3000;
const environment = 'development';
const connectionString = 'mongodb://localhost:27017/blog';

module.exports = {
    port: process.env.PORT || port,
    environment: process.env.NODE_ENV || environment,
    connectionString: connectionString
};