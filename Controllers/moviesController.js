
const Movie = require('../Models/movieModel') 


//Creating route handler functions

//exports. is used for multiple exports from single file
exports.getAllMovies = (req,res) => {
   
  }

  exports.getMovie = (req, res) => {
    

}

exports.createMovie = async (req, res) => {
    try{
        //Movie model have a create function that creates the document in db
        //req.body have movie data coming from req
        const movie = await Movie.create(req.body)
        //here simple send res
        res.status(201).json({
            status: 'success',
            data: {
                movie
            }
        })

    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        })

    }

   
 }

 exports.updateMovie = (req, res) => {
   

}

exports.deleteMovie = (req, res) => {
   
}