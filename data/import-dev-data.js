const mongoose = require('mongoose');
const dotenv = require('dotenv');  
const fs = require('fs');
const Movie = require('../Models/movieModel');

dotenv.config({path: './config.env'}) //env file path

// mongodb connection
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    // console.log(conn);
    console.log('DB Connection Successfull');
}).catch((error) => {
   console.log('Some error has occured');
})

//Read json file
//we give the complete path bcz we run through terminal
const movies = JSON.parse(fs.readFileSync('./Data/movies.json','utf-8'));

// Delete existing movies data from mongodb collection
const deleteMovies = async () => {
    try{
        await Movie.deleteMany();
        console.log('Data is deleted successfully');
    }catch(err) {
        console.log(err.message);
    }
    process.exit(); //for exit the process on terminal
}

// Import movies data to mongodb collection
const importMovies = async () => {
    try{
        //for multiple documents pass them in array here movies documents 
        //are already wrapped in array 
        await Movie.create(movies);
        console.log('Data is Imported successfully');
    }catch(err) {
        console.log(err.message);
    }
    process.exit(); //for exit the process on terminal
}

// deleteMovies();
// importMovies();
console.log(process.argv)
// node data/import-dev-data.js 
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\vs\\Desktop\\node js\\data\\import-dev-data.js'
//   ]


//command for import
// node data/import-dev-data.js --import
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\vs\\Desktop\\node js\\data\\import-dev-data.js',
//     --import
//   ]

//command for delete
// node data/import-dev-data.js --delete
// [
//     'C:\\Program Files\\nodejs\\node.exe',
//     'C:\\Users\\vs\\Desktop\\node js\\data\\import-dev-data.js',
//     --delete
//   ]

// now check on the basis of index while import is called or delete is called.

if(process.argv[2] === '--import') {
    importMovies();
}
if(process.argv[2] === '--delete') {
    deleteMovies();
}





