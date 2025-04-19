const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: password,
    name: String,
    phonenumber: Number
});

module.exports = mongoose.model('User', userSchema);
