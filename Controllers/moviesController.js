
const Movie = require('../Models/movieModel')

//Creating route handler functions

//exports. is used for multiple exports from single file
exports.getAllMovies = async (req, res) => {
    try {
        console.log(req.query)
        //req.query will gives the extra query parameters used for filtering
        //and it always give the values in the form of string
        //{ duration: '90', rating: '9' }


        //Movie.find will returns all movies
        //  const movies = await Movie.find()


        //if req.query is not work due to extra fields then remove the extra fields
        //for exclude some extra fields in the req.query to filter works properly
       
        const excludeFields = ['sort', 'page', 'limit', 'fields']

        //we make a shallow copy with spread operator that creates a new object with same properties
        // const queryObj = {...req.query}

       //here delete the sort,page,limit and fields in the queryObj
        // excludeFields.forEach((el) => {
        //   delete queryObj[el]
        // })


        //if added any query then it will filter the document 
        // e.g 127.0.0.1:3000/api/v1/movies/?duration=152&ratings=9

        // const movies = await Movie.find(req.query)

        //127.0.0.1:3000/api/v1/movies/?duration=152&ratings=9&page=12
        //this is the exclude fields queryObj i will remove page=12 in query

      ///advance filtereing
      //127.0.0.1:3000/api/v1/movies/?duration[gte]=140&rattings[gte]=9&price[lte]=70
      //output {duration: { gte: '140' },rattings: { gte: '9' },price: { lte: '70' }}
      // but we want {duration: { $gte: '140' },rattings: { $gte: '9' },
      // price: { $lte: '70' }} to apply advance filtering 

      let queryStr = JSON.stringify(req.query);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
      const queryObj = JSON.parse(queryStr);

      console.log(queryObj,'advance filtering')


    //   remove await here for sorting
        // const movies = await Movie.find(queryObj);
        let query = Movie.find(queryObj);

        // for sorting logic
        if(req.query.sort){
          const sortBy = req.query.sort.split(',').join(' ')
          query =  query.sort(sortBy)
        }else {
            query = query.sort('-createdAt')
        }

        // Limiting logic
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            console.log(fields,'...Fields')
            query = query.select(fields)

        } else{
            query = query.select('-__v')
        }

        const movies = await query;



        res.status(200).json({
            status: 'success',
            length: movies.length,
            data: {
                movies
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.getMovie = async (req, res) => {

    try {
        //Movie.find will returns all movies
        const movie = await Movie.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                movie
            }
        })

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.createMovie = async (req, res) => {
    try {
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

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
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

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })

    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}