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

//Get Movies
app.get('/api/v1/movies',(req,res) => {
  res.status(200).json({
    status: "Success",
    count: movies.length,
    data : {
        movies
    }
  })
})

//Post movies
app.post('/api/v1/movies',(req, res) => {
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
   

})

// Create a server
const port = 3000;
app.listen(port, () => {
    console.log('Server has started....')
})