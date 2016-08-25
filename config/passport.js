var JwtStrategy = require('passport-jwt').Strategy,
    User        = require('../users/users.schema.js'),
    config      = require('./config');

module.exports = function(passport){
    var  opts = {};
    opts.secretOrKey =  config.token.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({id: jwt_payload.id}, function(err, user){
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));
}