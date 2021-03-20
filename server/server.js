const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const csvtojson = require('csvtojson');
const fs = require("fs");
require("dotenv").config()

const MONGODBURI = process.env.MONGODBURI || 'mongodb://localhost:27017/projectData';
const PORT = process.env.PORT || 5000;

let csvData = []; //data from gm_data.csv
let jsonData = []; //data from db

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + 'public'));

//constructor for elements of gm_data.csv
function customer(date, client, project, projectCode, hours, billable, firstName, lastName, billableRate) {
  this.date = date;
  this.client = client;
  this.project = project;
  this.projectCode = projectCode;
  this.hours = hours;
  this.billable = billable;
  this.firstName = firstName;
  this.lastName = lastName;
  this.billableRate = billableRate;
}

////===========================================================
////CONECT TO MONGODB - INSERT .CSV DATA TO MONGO-ATLAS DB
////===========================================================
// csvtojson()
//   .fromFile('./gm_data.csv')
//   .then(data => {
//     csvData = data
//     console.log(csvData);

//     MongoClient.connect(MONGODBURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//       (err, client) => {
//         if (err) throw err;
//         console.log("Established Connection To MongoDB");
//         client
//           .db('gm-clients')
//           .collection('clients')
//           .insertMany(csvData, (err, res) => {
//             if (err) throw err;
//             console.log(`Inserted: ${res.insertedCount} rows`);
//             client.close
//           });
//       }
//     );
// });


////===========================================================
////CONECT TO MONGODB - CONVERT UPLOADED DB DATA TO JSON FILE
////===========================================================
// MongoClient.connect(
//   MONGODBURI, {
//     useNewUrlParser: true, 
//     useUnifiedTopology: true
// }, (err, client) => {
//   if (err) throw err;
//   console.log("Established Connection To MongoDB");
//   client.db('gm-clients').collection('clients').find().toArray(function (err, results) {
//     results.forEach(function (el) {
//       jsonData.push(new customer(el.date, el.client, el.project, el.projectCode, el.hours, el.billable, el.firstName, el.lastName, el.billableRate))
//     })
//     fs.writeFileSync('seed.json', JSON.stringify(jsonData, null, 9), (err) => {
//       if (err) throw err;
//     });
//     client.close();
//   })
// })



//TEST ROUTE --- // http://localhost:5000/
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