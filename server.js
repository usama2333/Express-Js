//always use dotenv at the top before the app
const dotenv = require('dotenv')

//mongoose can set the mongodb connection
const mongoose = require('mongoose')

//here we can give our config.env file path 
//then it can setup our variables into .env and we can access it easily
//now we can acces these varaibles through process.env it will added it into 
dotenv.config({path:'./config.env'})


const app = require("./app");

//This is releated to node js and this app.get('env') console development
//bcz at the moment we are in development environment

//Environment variables are global variables that are used to 
//define the environment in which app is running
console.log(app.get('env'))

//shows the list to all env variables some of the used by node js internally
//and some are defined by us
//we can access the environment variable by process.env.variableName
//process in the core module of node js which means us we run the app these variables are set
//we can use these variables everywhere without require and import or export
console.log(process.env)

//here we can set the mongodb connection with mongoose
//here we set the CONN_STR and newURlParse to true
//mongoose.connect give us a promise in which also give a conn object 
//when connection successfull then it run the then condition


mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log(conn);
    console.log('DB connection succesfull')

}).catch((error) => {
    console.log('Some error has occured')
})



// Create a server
// const port = 3000;

// accessing port from process.env
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('Server has started....')
})