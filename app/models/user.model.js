const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    document: Number
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', UserSchema);
