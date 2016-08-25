var express        = require('express'),
    config         = require('./config'),
    path           = require('path'),
    morgan         = require('morgan'),
    cors           = require('cors'),
    helmet         = require('helmet'),
    multer         = require('multer'),
    logger         = require('mm-node-logger')(module),
    bodyParser     = require('body-parser'),
    mysql          = require('mysql'),
    connection     = require('express-myconnection'), 
    methodOverride = require('method-override'), //used to manipulate POST
    app            = express();

    const SixMonths = 15778476000;
    function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Enable jsonp
    app.enable('jsonp callback');
    if (config.environment === 'development') {
        // Enable logger (morgan)
        app.use(morgan('dev'));
    
        // Disable views cache
        app.set('view cache', false);
    } else if (config.environment === 'production') {
        app.locals.cache = 'memory';
    }
    
     // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));


}
//Some security configurations in express
function initHelmetHeaders(app) {
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff())
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
      "maxAge": SixMonths,
      "includeSubdomains": true,
      "force": true
    }));
    app.disable("x-powered-by");
}

//Set some conditions to incoming requests
function initCrossDomain(app) {
    app.use(cors());
    app.use(function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token');

        next();
    });
}
//Initialize the routes file with a root route /api
function initRoutes(app) {
   app.use('/api', require('./routes'));
}

//Initialize the seed file with some standards registers to populate the MySql database
function initDB() {
    
    if(config.seedDB) {
        require('./seed');
    }
}

//Initialize all aboves functions
function init() {
    var app = express();
    initMiddleware(app);
    initHelmetHeaders(app);
    initCrossDomain(app);
    initRoutes(app);
    initDB();

    return app;
}

module.exports.init = init;