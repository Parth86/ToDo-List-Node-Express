const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: [true, 'password must be provided']
    },
})

module.exports = mongoose.model('users', UserSchema)