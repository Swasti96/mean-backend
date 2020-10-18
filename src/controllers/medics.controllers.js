const Medic = require('../models/medic');
const Hospital = require('../models/hospitlal');

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

    //medic id 
    const { id } = req.params;
    //user id
    const uid = req.id;

    try {
        const medicDB = await Medic.findById(id);
        const hospitalDB = await Hospital.findById(req.body.hospital);

        if (!medicDB) {
            res.status(404).json({
                msg: 'Ops this medic does not exist'
            });
        }

        if (!hospitalDB) {
            res.status(404).json({
                msg: 'Ops this hospital does not exist'
            });
        }

        const medicChanges = {
            ...req.body,
            user: uid
        }

        const updatedMedic = await Medic.findByIdAndUpdate(id, medicChanges, { new: true });

        res.json({
            updatedMedic
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
}

exports.removeMedic = async (req, res) => {

    const { id } = req.params;

    try {
        const medicDB = await Medic.findById(id);

        if (!medicDB) {
            res.status(404).json({
                msg: 'Ops this medic does not exist'
            });
        }

        await Medic.findByIdAndDelete(id);
        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Error'
        });
    }

    res.json('Remove');
}