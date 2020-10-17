const Medic = require('../models/medic');


exports.getMedics = async (req, res) => {

    const medics = await Medic.find()
        .populate('user', 'name')
        .populate('hospital', 'name');

    res.json({
        medics
    });
}

exports.createMedic = async (req, res) => {

    try {

        const id = req.id;

        const medic = new Medic({
            user: id,
            ...req.body
        })

        const newMedic = await medic.save();

        res.status(201).json({
            newMedic
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }

}

exports.updateMedic = async (req, res) => {

    const { name, img } = req.body;
    const { id } = req.params;

    res.json('Update');
}

exports.removeMedic = async (req, res) => {

    const { id } = req.params;

    res.json('Remove');
}