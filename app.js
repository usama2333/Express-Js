//Get a express function
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes')

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

//express function gives a object that stores in app
//It also contains the server and routes like get post
let app = express();

//Creating custom middleware
//a middleware is one that execute between request and response
//a middleware must contain req, res and next and when we called the next()
// then it moves to next middleware
// it effects only that part of code that is written below middleware
const logger = function(req,res,next) {
    console.log('Custom middleware called');
    next();
}

//this is the middleware used for post req body its displayes post request body
//express.json() is a built-in middleware function in Express.js. It parses incoming 
//requests with JSON payloads and is based on the body-parser middleware.
app.use(express.json())

//here use third party middleware morgan
//When use third party middleware functions we need to call with () that returns middleware
//morgan is used to log api info like get , status, how much time it takes
app.use(morgan('dev'))
//morgan middleware logs the api request in terminal
//GET /api/v1/movies/ 200 14.759 ms - 351

// app.use() is used to call middleware
app.use(logger)

//also define middeware inside app.use()
app.use((req,res, next) => {
    //this property is added is req object and is used by accessing it.
    req.requestedAt = new Date().toISOString();
    console.log('date middleware called')
    next();
})

//route handler is moved to the moviesRoutes.js file



//apis routes for seperate routes....................

// app.get('/api/v1/movies',getAllMovies)
// app.get('/api/v1/movies/:id',getMovie)
// app.post('/api/v1/movies',createMovie)
// app.patch('/api/v1/movies/:id', updateMovie)
// app.delete('/api/v1/movies/:id', deleteMovie)

//chaining api routes .......................
// app.route('/api/v1/movies')
//     .get(getAllMovies)
//     .post(createMovie)

// app.route('/api/v1/movies/:id')
//     .get(getMovie)
//     .patch(updateMovie)
//     .delete(deleteMovie)

//Mounting routes...............................................

// express.Router() returns us a middleware then which we use for routing
//with this we create different routes and placed them in different files
// const moviesRouter = express.Router();

// moviesRouter.route('/')
//     .get(getAllMovies)
//     .post(createMovie)

// moviesRouter.route('/:id')
//     .get(getMovie)
//     .patch(updateMovie)
//     .delete(deleteMovie)

//here call moviesRouter middleware and pass the url 
//mounting the router to this path
//this url concats with route like / and /:id to make complete url
app.use('/api/v1/movies', moviesRouter)

module.exports = app;