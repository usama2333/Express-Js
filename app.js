//Get a express function
const express = require('express');

//express function gives a object that stores in app
let app = express();


// Create a server
const port = 3000;
app.listen(port, () => {
    console.log('Server has started....')
})