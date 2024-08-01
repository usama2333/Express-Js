const express = require('express');

//This movieController has all the exports that are made
const moviesController = require('./../Controllers/moviesController')


//Mounting routes...............................................

// express.Router() returns us a middleware then which we use for routing
//with this we create different routes and placed them in different files
//it is just convention to use router
const router = express.Router();

router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.createMovie)

    router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router;