//movie.service.js
/**
 * 
 *Here is the file with all methods to create, retrieve, modify and delete movie(s) entities from database 
 *
 */

 var query      = require('../config/mysql'),
    userService = require('./user.service'),
    mysql       = require('mysql'),
    config      = require("../config/config"),
    Q           = require('q');
    service     = {};

service.availableMoviesList = availableMoviesList;
service.rentMovie = rentMovie;
service.returnMovie = returnMovie;
service.getMovieByName = getMovieByName;
service.getMovieById = getMovieById;
service.createMovie = createMovie;
service.getAllMovies = getAllMovies;
module.exports = service;  


function availableMoviesList (){
    var deferred = Q.defer();
        query('SELECT * from movies where quantity_rent < quantity_total', function(err, rows)   {
            if (err){
                deferred.reject(err);
            }else {
                deferred.resolve(rows)
            }
        });
        return deferred.promise
    } 

    function getAllMovies (){
    var deferred = Q.defer();
        query('SELECT * from movies', function(err, rows)   {
            if (err){
                deferred.reject(err);
            }else {
                deferred.resolve(rows)
            }
        });
        return deferred.promise
    } 

function rentMovie (movie, idUser){
    var deferred = Q.defer();

    rent_movie = {
        users_id: idUser,
        movies_id:movie.id,
        rent_at: (new Date())
    }

    query('INSERT INTO rent_movie SET ?',rent_movie, function(err, results) {
        if (err){
            deferred.reject(err);
        }else {
            query('UPDATE movies SET quantity_rent = quantity_rent+1 WHERE ?',{id:movie.id},function(err, result){
                if (err){
                   deferred.reject(err); 
                }else {
                    deferred.resolve("Filme alugado com sucesso");
                }
            })  
        }
    })
    return deferred.promise;
} 

function returnMovie (movie, userId){
    var deferred = Q.defer();
    
    query('SELECT * from rent_movie WHERE ? and ? and return_at is null ',[{movies_id: movie.id}, {users_id: userId}],function(err, rent_movie){
        if (err){
            deferred.reject(err);
        }else if (rent_movie.length > 0){
            query('UPDATE movies SET quantity_rent = quantity_rent-1 WHERE ?',{id:movie.id},function(err, response){
                if (err)deferred.reject(err);
                else {
                    var date = new Date();
                    query('UPDATE rent_movie SET ? WHERE ?',[{return_at:date},{id_rent_movie:rent_movie[0].id_rent_movie}],function(err, response){
                        deferred.resolve("Devolvido com sucesso");
                    })
                }
            })          
        }else {
            deferred.reject("Você não alugou esse filme");
        }
    })
    return deferred.promise;
} 

function getMovieByName (movieName){

    var deferred = Q.defer();
    
        query('SELECT * FROM movies WHERE title LIKE ?', '%'+movieName+'%', function(err, movies)   {
            if (err){
                deferred.reject(err);
            }else if (movies){
                deferred.resolve(movies)
            }
        });
        return deferred.promise
}

function getMovieById (id){
    var deferred = Q.defer();
        query('SELECT * FROM movies WHERE ?', {id: id}, function(err, movie)   {
            if (err){
                deferred.reject(err);
            }else if (movie.length > 0){
                var movieFound = movie;
                deferred.resolve(movieFound[0])
            }else {
                deferred.reject("Filme inexistente em nossa locadora");
            }
        });
        return deferred.promise
} 

function createMovie(movie){
    var deferred = Q.defer();
    query('INSERT INTO movies SET ?',movie, function(err, response){
        if (err){
            deferred.reject(err);
        }else {
            deferred.resolve("Inserido filme "+movie.title);
        }
    })
    return deferred.promise
}