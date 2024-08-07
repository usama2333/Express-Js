//mongoose can set the mongodb connection
const mongoose = require('mongoose')

//here we can create a schema with mongoose to valiate the document
const movieSchema = new mongoose.Schema({
    // name: String,
    name: {
        type: String,
        // required: true
        required: [true, 'name is required field'],
        unique: true
    },
    description: String,
    // duration: Number,
    duration: {
        type: Number,
        // required: true
        required: [true, 'duration is required field']
    },
    // ratings: Number
    ratings: {
        type: Number,
        default: 1.0
    }
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