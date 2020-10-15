const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        require: true,
        default: 'USER_ROL'
    },
    google: {
        type: Boolean,
        default: false
    },

});

module.exports = model('User', UserSchema);
