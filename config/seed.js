var query        = require('./mysql'),
    logger       = require('mm-node-logger')(module),
    movieService = require('../services/movie.service'),
    mysql        = require('mysql'),
    Q            = require('q'),
    config       = require("../config/config");
    async        = require('async');
    movies       = [];

    var movie1 = {
        title: "os vingadores 1",
        director:"Joss Whedon",
        quantity_total: 5,
        quantity_rent: 0
    }

    var movie2 = {
        title: "the godfather 1",
        director:" Francis Ford Coppola",
        quantity_total: 3,
        quantity_rent: 0
    }
     
    var movie3 = {
        title: "pulp fiction",
        director:"Quentin Tarantino - O Mito",
        quantity_total: 6,
        quantity_rent: 2
    }
     
    var movie4 = {
        title: "fight club",
        director:"David Fincher",
        quantity_total: 3,
        quantity_rent: 0
    }

     movies.push(movie1);
     movies.push(movie2);
     movies.push(movie3);
     movies.push(movie4);


cleanBase().then(function(response){
        console.log("terminou de limpar a base");
    insertMovies(movies).then(function(response){
        console.log("terminou de inserir os filmes");
    })
 
})

function cleanBase() {
    var the_promises = [];
    query("TRUNCATE rent_movie", function(err){
         movieService.getAllMovies().then(function(moviesList){
        moviesList.forEach(function(movie) {
        var deferred = Q.defer();
        query('DELETE from movies where ?',{id:movie.id}, function(err, response){
            deferred.resolve(response);
        })           
        the_promises.push(deferred.promise);
        });
    })
    })

    return Q.all(the_promises);
}


// async.each(contact.phoneNumbers, function(phone, callback2){
//             userService.getValidNumberPhone(phone.value).then(function(numberPhone){
//                 numberPhone = "+"+numberPhone;
//                 userService.getUser(numberPhone, function(user) {
//                 if (user && user.registrationFlag != false){
//                     var newContact = {name: user.name, phone: {value: user.phone.value}, registrationFlag: true, _id:user._id};
//                     callback2(newContact)
//                 }else {
//                     callback2(); 
//                 }
//              });
//             }).fail(function(){
//                 callback2();
//             })
//         }, 
//         function(result){
//             if (!result){
//                 var newContact2 = {name: contact.name.formatted, phone:contact.phoneNumbers, registrationFlag: false};
//                 return doneCallback(null, newContact2)
//             }else {
//                 return doneCallback(null, result)
//             }
//         })        
//     }



function insertMovies(moviesList) {
    var the_promises = [];

    moviesList.forEach(function(movie) {

        var deferred = Q.defer();
        console.log(movie);
            movieService.createMovie(movie).then(function(response){
            deferred.resolve(response);
        })
        the_promises.push(deferred.promise);
    });

    return Q.all(the_promises);
}

