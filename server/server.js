// const http = require('http');
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3003;

// //Data
// const customer = require('./models/customer');

// const path = require('path');

//body-parser
//extended: false - has to do with how the data is being parsed (and what kind can be parsed). For this unit, we'll just set this to false.
//recognize the incoming object as strings or arrays.
app.use(express.urlencoded({extended: false}));

//tells express to try to match requests with files in the directory called 'public'
app.use(express.static(__dirname + 'public'));


//================================================
// Global Configuration
//================================================
const mongoURI = 'mongodb://localhost:27017/customerdb';
const db = mongoose.connection;

//================================================
// Connect to Mongo
//================================================
mongoose.connect(mongoURI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('the connection with mongod is established');
});
//================================================
// Connection Error/Success - optional but can be helpful
// Define callback functions for various events
//================================================
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));


//routes
const customerRoutes = require('./routes/customer');
app.use('/customer', customerRoutes);


//Listening
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})
