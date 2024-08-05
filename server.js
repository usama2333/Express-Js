//always use dotenv at the top before the app
const dotenv = require('dotenv')

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

// Create a server
// const port = 3000;

// accessing port from process.env
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('Server has started....')
})