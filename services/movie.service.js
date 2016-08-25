//movie.service.js
/**
 * 
 *Here is the file with all methods to create, retrieve, modify and delete movie(s) entities from database 
 *
 */

 var query = require('../config/mysql'),
    userService = require('./user.service'),
    mysql   = require('mysql'),
    config  = require("../config/config"),
    Q = require('q');
    service = {};

service.availableMoviesList = availableMoviesList;
service.rentMovie = rentMovie;
service.returnMovie = returnMovie;
service.getMovieByName = getMovieByName;
service.getMovieById = getMovieById;

module.exports = service;  


function availableMoviesList (){
    var deferred = Q.defer();
        query('SELECT * from movies where quantity_available > 0', function(err, rows)   {
            if (err){
                deferred.reject(err);
            }else {
                deferred.resolve(rows)
            }
        });
        return deferred.promise
    } 

function rentMovie (movie){
    var deferred = Q.defer();
    deferred.resolve("filme alugado");
    // query('UPDATE movies SET quantity_available -= 1 WHERE ?',{id: movie.id}, function(err, results) {
        
    // })

} 

function returnMovie (id){

return null;

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
            console.log(movie);
            if (err){
                deferred.reject(err);
            }else if (movie.length > 0){
                var movieFound = movie;
                deferred.resolve(movieFound)
            }else {
                deferred.reject("id não encontrado");
            }
        });
        return deferred.promise
} 