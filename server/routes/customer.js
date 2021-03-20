const express = require('express')
const router = express.Router();
// const path = require('path');


// var fs = require('fs');
// var parse = require ('csv-parse');
// const csvtojson = require('csvtojson');

// ///Users/salhuriz/Projects/client-stats/server/gm_data.csv

// csvtojson()
//     .fromFile('../gm_data.csv')
//     .then(csvData => {
//         console.log(csvData);
//     })

const Customer = require('../models/customer.js');

//TEST ROUTE --- // http://localhost:3003/customer
router.get('/', (req, res) => {
    res.send('Say Hello to Meeeeee')
})

//Index
router.get('/', (req, res) => {
    Customer.find({})
        .then(customer=> {
            res.json({customer})
        })
})

module.exports = router;