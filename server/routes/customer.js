const express = require('express')
const router = express.Router();
const path = require('path');
let fs = require('fs');
let parse = require('csv-parse');
const csv = require('csvtojson');

const Customer = require('../models/customer.js');

//TEST ROUTE --- // http://localhost:3003/customer
router.get('/', (req, res) => {
    res.send('Say Hello to Ze Routes')
})

//Index Route -- // http://localhost:3003/customer/
router.get('/', (req, res) => {
    Customer.find({})
        .then(data => {
            res.json({data})
        })
})


//Index Route -- // http://localhost:3003/customer/allcustomers
router.get('/allcustomers', (req, res) => {
    Customer.find({}, 'client', (err, data) => {
      res.json({data: data});
    })
  })

// router.get('/allcustomers', (req, res) => {
//     Customer.find({}, (error, foundCustomers) => {
//       if (error) {
//         res.status(400).json({error: error.message});
//       }
//       res.status(200).json(foundCustomers);
//     });
//   });

module.exports = router;