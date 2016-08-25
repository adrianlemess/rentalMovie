'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

// Populate the DB with sample data
config.seedDB = false;
// Token settings
config.token = {
    secret: process.env.TOKEN_SECRET || 'rentalmovies',
    expiration: process.env.TOKEN_EXPIRATION || 60*60*24 //24 hours
};

// Server settings
config.server = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000
};

// MongoDB settings
config.db = {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'rentalmovies'
};

// Export configuration object
module.exports = config;