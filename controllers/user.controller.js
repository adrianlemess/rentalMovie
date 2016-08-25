 //user.controller.js
 /**
  *
  *  This file have all methods to handler external requests about users
 */

    var express     = require('express'),
    userService     = require('../services/user.service');
    tokenController = require('./token.controller');
module.exports = {
    
    signin:function(req, res, next){

    },
    signup: function(req,res,next){
        var user = req.body;
         if (typeof user.email == 'undefined' || !user.email.trim() || user.password == 'undefined' || !user.name.trim()) {
             res.status(400).json("Parâmetros Inválidos");
        }
        userService.saveUser(user).then(function(userSave){
            userSave.password = undefined;

            tokenController.createToken(userSave, function(res, err, token){
                console.log("Chamou a função createToken");
                if (err){
                    logger.error(err.message);
                    return res.status(400).send(err);
                }else {
                    res.status(201).json({user:user, token:token});
                }
            })
        }).fail(function(err){
            res.status(404).json(err)
        })
    },
    signout: function(req, res, next){

    }

}