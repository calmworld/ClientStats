const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
const fs = require('fs');
const fastcsv = require('fast-csv');
const csvtojson = require('csvtojson');
require("dotenv").config()

const PORT = process.env.PORT || 3003;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + 'public'));


// Global Configuration
const MONGODBURI = process.env.MONGODBURI || 'mongodb://localhost:27017/projectData';


let stream = fs.createReadStream('./gm_data.csv');
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on('data', (data) => {
    csvData.push({
      date: data[0],
      client: data[1],
      project: data[2],
      projectCode: data[3],
      hours: data[4],
      billable: data[5],
      firstName: data[6],
      lastName: data[7],
      billableRate: data[8]
    })
  })
  .on('end', () => {
    csvData.shift();
    console.log(csvData);

    mongodb.connect(
      MONGODBURI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },
      (err, client) => {
        if (err) throw err;
          client
            .db('gm-clients')
            .collection('clients')
            // .insertMany(csvData, (err, res) => {
            //   if (err) throw err;
            //   console.log(`Inserted: ${res.insertedCount} rows`);
            //   client.close
            // });
      }
    );
  });

stream.pipe(csvStream);


//TEST ROUTE --- // http://localhost:3003/
app.get('/', (req, res) => {
  res.send('Say Hello to Zee Server')
})


//routes
const customerRoutes = require('./routes/customer.js');
app.use('/customer', customerRoutes);


//Listening
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})