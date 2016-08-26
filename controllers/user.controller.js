 //user.controller.js
 /**
  *
  *  This file have all methods to handler external requests about users
 */

    var express     = require('express'),
    userService     = require('../services/user.service');
    tokenController = require('./token.controller');

module.exports = {
    
    /**
 * This method check if the email and password is correct to make a sign in
 *
 * @method signin
 * @param {String}  email
 * @param {String} password
 * @returns {res} response with 201 status and json {user:user, token:token} if the email and password is valid 
 */
    signin:function(req, res, next){
         
         var email = req.body.email;
         var password = req.body.password;
         //check if the parameters are invalid
         if (typeof email == 'undefined' || !email.trim() || password == 'undefined' || !password.trim()){
             res.status(400).json("Parâmetros Inválidos");
        }else {
            //get an user with email
            userService.getUserByEmail(email).then(function(user){
                //receive a boolean to compare the password
                userService.comparePassword(user, password).then(function(match){
                    if (match){
                        tokenController.createToken(user, function(err, token){
                                if (err){
                                    logger.error(err.message);
                                    return res.status(400).send(err);
                                }else {
                                    user.password = undefined;
                                    res.status(201).json({user:user, token:token});
                                }
                            })
                    }else {
                        res.status(401).json("Não autorizado");
                    }
                })
            }).fail(function(err){
                res.status(404).json(err);
            })
        }
    },

    
/**
 * This method create an user
 *
 * @method signup
 * @param {Object}  user
 * @returns {res} response with 201 status and json {user:user, token:token} if the user is successfully created 
 */
    signup: function(req,res,next){
        var user = req.body;
        //check if the parameters are invalid
         if (typeof user.email == 'undefined' || !user.email.trim() || user.password == 'undefined' || !user.password.trim() || 
         user.name == 'undefined' || !user.name.trim()) {
             res.status(400).json("Parâmetros Inválidos");
        }else {
            userService.saveUser(user).then(function(userSave){
                userSave.password = undefined;
                tokenController.createToken(userSave, function(err, token){
                    if (err){
                        logger.error(err.message);
                        return res.status(400).send(err);
                    }else {
                        res.status(201).json({user:userSave, token:token});
                    }
                })
            }).fail(function(err){
                res.status(404).json(err)
            })
        }
    },

/**
 * This method make an user logout 
 *
 * @method signout
 * @returns {res} response with 200 status if the user's signout is successfully  
 */
    signout: function(req, res, next) {
        token.expireToken(req.headers, function(err, success) {
            if (err) {
                logger.error(err.message);
                return res.status(401).send(err.message);
            }
            if(success) {
                delete req.user;
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        });
    }

}

