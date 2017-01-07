Rental Movies Web Service
======

This is a web service with methods to logging users, session control, rent movies, return them and see the availables movies to rent. This webservice was made in NodeJS with some libraries.


### Usage 

``` 
npm intall
npm start

```

### Methods availables to consume by any client

| URL                             | Description      | Return                     | Parameters                        |
|:-------------------------------:|:----------------:|:-------------------------: | :--------------------------------:|
| POST /auth/sign                 | Users login      | {user: user, token: token} | {password: "", email: ""}         |
| POST /auth/signup               | Users subscriber | {user: user, token: token} | { name:"",password: "", email: ""}|
| POST /auth/sigout               | Users logout and Erase token in database    | Boolean | Token on Header         |
| GET /movies                     | return an available movie list | [{movies}] | None |
| POST /movie/rentMovie/:idMovie  | rent a movie by Id     | {message: "Movie Rent for you"} | :idMovie, idUser         |
| GET /movie/returnMovie/:idMovie | return a movie by Id | {message: "Movie return with successful"} | :idMovie, idUser|
| GET /movie/:movieName           | get a movie by name | {movie: movie} | :movieName |



### Any doubts? Who do I talk to? ###

* Twitter: @adrianlemess
* Email: adrianlemess@gmail.com
