 //token.controller.js
 /**
  *
  *  This file have all methods to handler, validaty and create tokens
 */

var jwt         = require('jsonwebtoken'),
    userService = require('../services/user.service'),
    config      = require('../config/config'),
    query       = require('../config/mysql');

/**
 * Extract the token from the header Authorization.
 *
 * @method extractTokenFromHeader
 * @param {Object} headers The request headers
 * @returns {String} the token
 * @private
 */
function extractTokenFromHeader(headers) {

    //Check if the header is null or doesn't have the authorization atributte on header 
    if (headers == null) throw new Error('Header is null');
    if (headers.authorization == null) throw new Error('Authorization header is null');


    var authorization = headers.authorization;
    var authArr = authorization.split('');
    if (authArr.length !== 2) throw new Error('Authorization header value is not of length 2');

    // retrieve token
    var token = authArr[1];

    // verify token
    try {
        jwt.verify(token, config.token.secret);
    } catch(err) {
        throw new Error('The token is not valid');
    }
    return token;
}



/**
 * Create a token with the jwt.sign and stored in table users_token.
 *
 * @method createToken
 * @param {Object}   user to payload
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, token)` if successfully created and stored
 */
function createToken(payload, cb){
    
    var ttl = config.token.expiration;
      if(payload != null && typeof payload !== 'object') { return cb(new Error('payload is not an Object')) }
      if(ttl != null && typeof ttl !== 'number') { return cb(new Error('ttl is not a valid Number')) }
      
    var token = jwt.sign(payload, config.token.secret, {
          expiresIn: config.token.expiration // expires in 24 hours
        });
     
     //find a user with his email
      userService.getUserByEmail(payload.email).then(function(user){
        var users_token = {
            users_id: user.id,
            token: token,
            ttl: ttl
        }

        //insert a token in table
        query('INSERT INTO users_token SET ? ',users_token, function(err, response){
           if (err){
                return cb(err);
           }else {
                 cb(null, token);
           }
        })
      }).fail(function(err){
          cb(err);
      })

}

/**
 * Expires a token by deleting the entry in users_token.
 *
 * @method expireToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, true)` if successfully deleted
 */
function expireToken(headers, cb) {
    try {
        var token = extractTokenFromHeader(headers);

        if(token == null) {return cb(new Error('Token is null'));}
        query('DELETE FROM users_token WHERE token LIKE ?', '%'+token+'%', function(err, response){
            if (err){
                return cb(err);
            }else{
                cb(null, true) 
            }
        })
    } catch (err) {
        return cb(err);
    }
}

/**
 * Verify if token is valid.
 *
 * @method verifyToken
 * @param {Object}   headers The request headers
 * @param {Function} cb      Callback function
 * @returns {Function} callback function `callback(null, JSON.parse(userData))` if token exist
 */
function verifyToken(token, cb) {
    try {
        var token = token;

        if(token == null) {return cb(new Error('Token is null'));}

         query('SELECT FROM users_token WHERE token LIKE ?', '%'+token+'%', function(err, userData){
            // gets the associated data of the token
                if(err) {return cb(err);}

                if(!userData) {return cb(new Error('Token not found'));}

                return cb(null, JSON.parse(userData));
            });
    } catch (err) {
        return cb(err);
    }
}

module.exports = {
    createToken: createToken,
    expireToken: expireToken,
    verifyToken: verifyToken
};