const Hospital = require('../models/hospitlal');


exports.getHospitals = async (req, res) => {

    const hospitals = await Hospital.find().populate('user','name lastName img');

    res.json({
        hospitals
    });
}

exports.createHospital = async (req, res) => {

    try {

        const id = req.id;
        console.log(id)
        const hospital = new Hospital({
            user: id,
            ...req.body
        });

        const newHospital = await hospital.save();

        res.status(201).json({
            newHospital
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: ' Error inesperado'
        });
    }

    res.json('Post')
}

exports.updateHospital = (req, res) => {

    const { id } = req.params;
    const { name, img } = req.body;

    res.json('Update')
}

exports.removeHospital = (req, res) => {

    const { id } = req.params;
    res.json('Remove')
}