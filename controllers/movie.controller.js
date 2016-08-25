 //movie.controller.js
 /**
  *
  *  This file have all methods to handler external requests about movies
 */
var query = require('../config/mysql');
    express = require('express'),
    movieService = require('../services/movie.service');

module.exports = {
    
    availableMoviesList:function(req, res, next){
        movieService.availableMoviesList().then(function(response){
            res.json(response);
        }).fail(function(err){
            res.sendStatus(404).json(err);
        })
    }, 
    
    rentMovie: function(req, res, next){
        var idMovie = req.params.idMovie;
        if (typeof idMovie == 'undefined' || !idMovie.trim()) {
            res.status(400).json("Parâmetro inválido");
        }else {
            movieService.getMovieById(idMovie).then(function(movie){
                if (movie && movie.quantity_available > 0){
                     movieService.rentMovie(movie).then(function(response){
                         console.log(response);
                     })
                }else if (movie.quantity_available == 0){
                    res.status(404).json("Filme indisponível no momento");
                    
                }else {
                     res.status(404).json("Filme não existe em nossa locadora");
                }
               
            }).fail(function(err){
                res.status(404).json(err);
            })
        }
    },
    
    returnMovie: function(req, res, next){

    },
    searchMovie: function(req, res, next){
        var movieName = req.params.movieName;
        if (typeof movieName == 'undefined' || !movieName.trim()) {
            res.status(400).json("Parâmetro inválido");
        }else {

            movieService.getMovieByName(movieName).then(function(response){
                if (response){
                     res.json(response);
                }else {
                     res.status(404).json("Nenhum registro corresponde a pesquisa");
                }
               
            }).fail(function(err){
                res.status(404).json(err);
            })
        }
    }
}

//'SELECT * from movies where ?', {id: '1'}, function(err, rows)