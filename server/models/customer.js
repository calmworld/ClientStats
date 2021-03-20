const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: String, //project col in CSV
    clients: String, //client col in csv
    hours: Number, // hours col in csv
    billable_hours: Number, // billable col in csv
    billable_amount: Number // billable rate in csv
})

// name | clients | hours | billable hours | billable amount

module.exports = mongoose.model('Customer', customerSchema);


