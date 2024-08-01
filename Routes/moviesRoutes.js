const express = require('express');

//This movieController has all the exports that are made
const moviesController = require('./../Controllers/moviesController')


//Mounting routes...............................................

// express.Router() returns us a middleware then which we use for routing
//with this we create different routes and placed them in different files
//it is just convention to use router
const router = express.Router();

//router.param is used to take id from the request and displays that id in value
//router.param middleware is called only on those where the string is defined like id

// router.param('id', (req, res, next, value) => {
//     console.log('Movie ID is ' + value)
//     next()
// })


//moviesController have the checkId param middleware that can used here on id type routes
router.param('id',moviesController.checkId)


router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.createMovie)

    router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = router;