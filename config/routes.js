//controllers/routes.js
/**
 * This file contain the URL to access the web service
 */
var express = require('express'),
router = express.Router();
movieController = require('../controllers/movie.controller'),
userController = require('../controllers/user.controller');

router.get('/',function(req, res){
    res.send("Hello World");
})


//Users
//authentication
// router.post('/auth/signin', userController.signin);    
 router.post('/auth/signup', userController.signup);
// router.get('/auth/logout', userController.signout);

// //Movies
 router.get('/movies', movieController.availableMoviesList);
 router.get('/movie/rentMovie/:idMovie', movieController.rentMovie);
 router.get('/movie/returnMovie/:idMovie', movieController.returnMovie);
 router.get('/movie/:movieName', movieController.searchMovie);
module.exports = router;  