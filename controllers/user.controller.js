 //user.controller.js
 /**
  *
  *  This file have all methods to handler external requests about users
 */

    var express      = require('express'),
    userService = require('../services/user.service');

module.exports = {
    
    signin:function(req, res, next){

    },
    signup: function(req,res,next){
        var user = req.body;
         if (typeof user.email == 'undefined' || !user.email.trim() || user.password == 'undefined' || !user.name.trim()) {
             res.status(400).json("Parâmetros Inválidos");
        }

        userService.saveUser(user).then(function(){
            
        })
    },
    signout: function(req, res, next){

    }

}