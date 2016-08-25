/*registerUser(user)
login(email, password)
logoff(user)*/


/**
 * 
 */
 var query            = require('../config/mysql'),
    mysql             = require('mysql'),
    config            = require("../config/config"),
    Q                 = require('q'),
    bcrypt            = require('bcryptjs');
    service           = {},
    SALT_WORK_FACTOR = 10;

service.saveUser = saveUser;
module.exports = service;  

function saveUser(user){
    //Validate the email user
    var deferred = Q.defer();
    query('SELECT * from users WHERE ? ', {email:user.email},function(err, response){
        if (err) deferred.reject(err);
        else {
            //if length == 0 user email don't exist yet
            if (!(response.length > 0)){
                hashPassword(user.password).then(function(passwordHash){
                    user.password = passwordHash;
                    query('INSERT INTO users SET ?',user,function(err, result){
                        if (err){deferred.reject(err);}
                        else {deferred.resolve(user);}
                    })
                })
            }else {
                deferred.reject("Email ja existe");
            }
        }
    })
    return deferred.promise;
}

function comparePassword(user, passwordToTest){
    var deferred = Q.defer();
    bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err){
            deferred.reject(err)
        }else {
            deferred.resolve(isMatch);
        }
    });
    return deferred.promise;
}

function hashPassword(password) {
    var deferred = Q.defer();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) { deferred.reject(err); }

        // hash the password using the new salt
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) { deferred.reject(err); }

            // return password with the hashed one
            deferred.resolve(hash);
        });
    });
    return deferred.promise;
}