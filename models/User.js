const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema ({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    AddType: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    Skype: {
        type: String,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },      
});

module.exports = User = mongoose.model('user', UserSchema);