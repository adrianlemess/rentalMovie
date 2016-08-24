//movie.service.js
/**
 * 
 *Here is the file with all methods to create, retrieve, modify and delete movie(s) entities from database 
 *
 */

 var query = require('../config/mysql'),
    userService = require('./user.service'),
    Q = require('q');
    service = {};

service.availableMoviesList = availableMoviesList;
service.rentMovie = rentMovie;
service.returnMovie = returnMovie;
service.searchMovie = searchMovie;

module.exports = service;  


function availableMoviesList (){
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

function rentMovie (id){

return null;
} 

function returnMovie (id){

return null;

} 

function searchMovie (movieName){

return null;

} 