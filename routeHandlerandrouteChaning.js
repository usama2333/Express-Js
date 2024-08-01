//Get a express function
const express = require('express');
const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

//express function gives a object that stores in app
//It also contains the server and routes like get post
let app = express();

//this is the middleware used for post req body its displayes post request
app.use(express.json())

//Route = http method + url 
// app.get('/', (req, res) => {
//     //set status and response
//     //for text or html use send()
//     // res.status(200).send('Hello from the express server..')

//     //for json response use json()
//     res.status(200).json({message : 'Hello', status: 200}) 
// })


//Creating route handler functions

const getAllMovies = (req,res) => {
    res.status(200).json({
      status: "Success",
      count: movies.length,
      data : {
          movies
      }
    })
  }

const getMovie = (req, res) => {
    //req.params gives us a { id: '4' } api endpoint like this
    //It gives route parameter and its value
//    console.log(req.params);
   const id = +req.params.id;
   const movie = movies.find(el => el.id === id);

   if(!movie) {
     res.status(404).json({
        status: 'failed',
        message: 'The movie with this ' +id+ ' is not found'
     })
     return;
   }

   res.status(200).json({
    status: 'success',
    data: {
        movie
    }
   })

}

const createMovie = (req, res) => {
    // console.log(req.body);
     //at the moment the req.body is undefined when we create new movie
     
      //app.use(express.json())
     //this is the middleware used for post req body its displayes post request
 
     const newId = movies[movies.length-1].id + 1;
     const newMovie = Object.assign({id: newId}, req.body);
 
     movies.push(newMovie);
 
     fs.writeFile('./data/movies.json',JSON.stringify(movies), (err) => {
        res.status(201).json({
         status : 'Success',
         data: {
             movie: newMovie
         }
        })
     }) 
 }

 const updateMovie = (req, res) => {
    let id = +req.params.id;
    let movieToUpdate = movies.find(el => el.id === id);
    let index = movies.indexOf(movieToUpdate); //eg id=4 , index=3

    if(!movieToUpdate) {
        res.status(404).json({
           status: 'failed',
           message: 'The movie with this ' +id+ ' is not found'
        })
        return;
      }

    Object.assign(movieToUpdate,req.body);
    movies[index] = movieToUpdate;

   

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: 200,
            data: {
                movie: movieToUpdate
            }
        })
    })

}

const deleteMovie = (req, res) => {
    const id = +req.params.id;
    const movieToDelete = movies.find(el => el.id === id);

    if(!movieToDelete) {
        res.status(404).json({
            status: 'failed',
            message: 'Movie with this id ' +id+ 'is not found'
        })
    }
    const index = movies.indexOf(movieToDelete);

    movies.splice(index,1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: 'success',
            data: {
                movie: null
            }
        })
    })

}

//apis routes for seperate routes

// app.get('/api/v1/movies',getAllMovies)
// app.get('/api/v1/movies/:id',getMovie)
// app.post('/api/v1/movies',createMovie)
// app.patch('/api/v1/movies/:id', updateMovie)
// app.delete('/api/v1/movies/:id', deleteMovie)

//chaining api routes
app.route('/api/v1/movies')
    .get(getAllMovies)
    .post(createMovie)

app.route('/api/v1/movies/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)

// Create a server
const port = 3000;
app.listen(port, () => {
    console.log('Server has started....')
})