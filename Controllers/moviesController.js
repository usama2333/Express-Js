
const Movie = require('../Models/movieModel');


//Request body middleware for post request
//This will be used in post request to check for correct body
//     .post(moviesController.validateBody, moviesController.createMovie) 
exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.releaseYear) {
        res.status(400).json({
            status: 'Failed',
            message: 'Not a valid movie data'
        })
        return;
    }
    next();
   
}

//Creating route handler functions

//exports. is used for multiple exports from single file
exports.getAllMovies = (req,res) => {
   
  }

  exports.getMovie = (req, res) => {
    

}

exports.createMovie = (req, res) => {
   
 }

 exports.updateMovie = (req, res) => {
   

}

exports.deleteMovie = (req, res) => {
   
}