 //movie.controller.js
 /**
  *
  *  This file have all methods to handler external requests about movies
 */
var query = require('../config/mysql');
    express = require('express'),
    movieService = require('../services/movie.service');

module.exports = {
    listTeste:function (req, res, next) {
        query('SELECT * from movies', function(err, rows)   {
            res.json(rows);
        });
    },
    availableMoviesList:function(req, res, next){
        movieService.availableMoviesList().then(function(response){
            res.json(response);
        }).fail(function(err){
            res.sendStatus(404).json(err);
        })
    }, 
    rentMovie: function(req, res, next){

    },
    returnMovie: function(req, res, next){

    },
    searchMovie: function(req, res, next){

    }
}

//'SELECT * from movies where ?', {id: '1'}, function(err, rows)