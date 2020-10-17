const { Schema, model } = require('mongoose');

const MedicSchema = new Schema({
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
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
},{ collection: 'Medic' });

module.exports = model('Medic', MedicSchema);