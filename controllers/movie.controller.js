 //movie.controller.js
 /**
  *
  *  This file have all methods to handler external requests about movies
 */
    var express      = require('express'),
    movieService = require('../services/movie.service');

module.exports = {
/**
 * This method get only the movies that have available copies
 *
 * @method availableMoviesList
 * @returns {res} response with the movies available
 */
    availableMoviesList:function(req, res, next){
        movieService.availableMoviesList().then(function(response){
            res.json(response);
        }).fail(function(err){
            res.sendStatus(404).json(err);
        })
    }, 
/**
 * This method get only the movies that have available copies
 *
 * @method rentMovie
 * @param req.body.idMovie 
 * @param req.body.idUser
 * @returns {res} a message that inform if was successfully or not the movie rent
 */
    rentMovie: function(req, res, next){
        var idMovie = req.body.idMovie;
        var idUser = req.body.idUser;
        
        if (typeof idMovie == 'undefined' || !idMovie.trim()) {
            res.status(400).json("Parâmetro inválido");
        }else {
            movieService.getMovieById(idMovie).then(function(movie){

                if (movie && (movie.quantity_total > movie.quantity_rent)){
                     movieService.rentMovie(movie, idUser).then(function(response){
                         res.json(response);
                     })
                }else {
                    res.status(404).json("Filme indisponível no momento");                    
                }
               
            }).fail(function(err){
                res.status(404).json(err);
            })
        }
    },
    
/**
 * This method get only the movies that have available copies
 *
 * @method returnMovie
 * @param req.body.idMovie 
 * @param req.body.idUser
 * @returns {res} a message that inform if was successfully or not the movie return
 */
    returnMovie: function(req, res, next){
        var idMovie = req.body.idMovie;
        var idUser = req.body.idUser;
        if (typeof idMovie == 'undefined' || !idMovie.trim()) {
            res.status(400).json("Parâmetro inválido");
        }else {
            movieService.getMovieById(idMovie).then(function(movie){
                if (movie){
                    movieService.returnMovie(movie, idUser).then(function(response){
                        res.json(response)
                    }).fail(function(err){
                        res.status(400).json(err);
                    })
                }
            }).fail(function(err){
                res.status(404).json(err);
            })
        }

    },
/**
 * This method get all the movies that match with the movieName parameter
 *
 * @method searchMovie
 * @param movieName
 * @returns {res} response with a movie(s) 
 */
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
