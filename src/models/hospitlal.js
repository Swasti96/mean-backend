const { Schema, model } = require('mongoose');

const HospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { collection: 'Hospital' });

module.exports = model('Hospital', HospitalSchema);