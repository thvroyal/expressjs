const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password: String,
    avatar: String
});
var User = mongoose.model('User',userSchema,'users');
module.exports = User;