const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    campus: {
        type: String,
    }
}, {
    timestamp: true
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;