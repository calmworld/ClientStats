const express = require('express');
// const mongoose = require('mongoose');
const app = express();

const mongodb = require('mongodb').MongoClient;

const csvtojson = require('csvtojson');

const PORT = process.env.PORT || 3003;

require("dotenv").config()



//body-parser
//extended: false - has to do with how the data is being parsed (and what kind can be parsed).
//recognize the incoming object as strings or arrays.
app.use(express.urlencoded({extended: false}));

//tells express to try to match requests with files in the directory called 'public'
app.use(express.static(__dirname + 'public'));

//const whitelist = ['http://localhost:3000'];

// Global Configuration
const MONGODBURI = process.env.MONGODBURI || 'mongodb://localhost:27017/projectData';
//const db = mongodb.connection;


csvtojson()
  .fromFile('./gm_data.csv')
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, 
      // (err, client) => {
      //   if (err) throw err;
      //   client
      //     .db('gm-clients')
      //     .collection('clients')
      //     .insertMany(csvData, (err, res) => {
      //       if (err) throw err;
      //       console.log(`Inserted: ${res.insertedCount} rows`);
      //       client.close
      //     });
      // }
    );
});


// Connection Error/Success 
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODBURI));
db.on('disconnected', () => console.log('mongo disconnected'));


//routes
const customerRoutes = require('./routes/customer.js');
app.use('/customer', customerRoutes);


//Listening
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})
