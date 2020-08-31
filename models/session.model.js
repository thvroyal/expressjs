const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    product : String,
    quantity: Number
})
var sessionSchema = new mongoose.Schema({
    id : String,
    cart: [cartSchema]
});
var Session = mongoose.model('Session',sessionSchema,'sessions');
module.exports = Session;