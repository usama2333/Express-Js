
const Movie = require('../Models/movieModel') 


//Creating route handler functions

//exports. is used for multiple exports from single file
exports.getAllMovies = async (req,res) => {
    try{
         //Movie.find will returns all movies
    const movies = await Movie.find()

    res.status(200).json({
        status: 'success',
        length: movies.length,
        data: {
            movies
        }
    })

    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
   
   
  }

  exports.getMovie = async (req, res) => {
    
    try{
        //Movie.find will returns all movies
   const movie = await Movie.findById(req.params.id)

   res.status(200).json({
       status: 'success',
       data: {
           movie
       }
   })

   }catch(err){
       res.status(404).json({
           status: 'failed',
           message: err.message
       })
   }
}

exports.createMovie = async (req, res) => {
    try{
        //Movie model have a create function that creates the document in db
        //req.body have movie data coming from req
        //Movie.create returns a promise that we use await keyword
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

 exports.updateMovie = async (req, res) => {
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body,{
            // new: true means that it returns a updated document
            //runValidator: true means it validate the updated req through schema also
            new: true, runValidator: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                movie: updatedMovie
            }
        })

    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })

    }
   

}

exports.deleteMovie = async (req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
        data: null
    })

    }catch(err){
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }

    
   
}