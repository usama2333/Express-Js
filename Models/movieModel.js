//mongoose can set the mongodb connection
const mongoose = require('mongoose')

//here we can create a schema with mongoose to valiate the document
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required field'],
        unique: true,
        trim: true   //if can remove whitespaces before and after the name
    },
    description: {
        type: String,
        required: [true, 'Description is required field'],
        trim: true
    },
    duration: {
        type: Number,
        // required: true
        required: [true, 'Duration is required field']
    },
    // ratings: Number
    ratings: {
        type: Number,
        // default: 1.0
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, 'Release year is required field']
    },
    releaseDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false //this field is not shown in response
    },
    genres: {
        type: [String],  // String array
        required: [true, 'Genrus is required field']
    },
    directors: {
        type: [String],  // String array
        required: [true, 'Directors is required field']
    },
    coverImage: {
        type: [String],  // String array
        required: [true, 'Cover Image is required field']
    },
    price: {
        type: Number,
        required: [true, 'Price is required field']
    },

})

//mongoose.modal() create collection in database and gives a modal through which
//we can handle crud
//mongoose.modal() takes two things 
//first it creates the collection in the database with Movies (parular) name
//second is the movieSchema through which it validates the document  
//here we are creating a movie modal with this we can create update 
//and document in the database with movie variable
//for convention model name always start with capital letter
const Movie = mongoose.model('Movie',movieSchema)

//testing for creating movie
//creating a document with movie model

// const testMovie = new Movie({
//     name: 'Doctor doms day',
//     description: 'Super villian by mcu',
//     duration: 220,
//     ratings: 5
// })

//This will save the document in the collection and return a promise for success 
//and error also shows the lastest document in console that is save

// testMovie.save()
// .then(doc => console.log(doc))
// .catch(err => console.log('Some error occured '+err))

module.exports = Movie;