const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: String,
    clients: String,
    hours: Number,
    billable_hours: Number,
    billable_amount: Number
})

// name | clients | hours | billable hours | billable amount

module.exports = mongoose.model('Customer', customerSchema);


