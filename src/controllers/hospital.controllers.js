const Hospital = require('../models/hospitlal');


exports.getHospitals = async (req, res) => {

    const pageNumber = Number(req.query.pageNumber) || 0;

    const [hospitals, total] = await Promise.all([
        Hospital.find()
            .skip(pageNumber)
            .limit(5)
            .populate('user', 'name lastName img'),

        Hospital.countDocuments()
    ]);

    res.json({
        hospitals,
        total
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
            msg: 'Internal Error'
        });
    }

    res.json('Post')
}

exports.updateHospital = async (req, res) => {

    const { id } = req.params;
    const uid = req.id;

    try {

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                msg: 'Ops, this id doesnt exist'
            })
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true });

        res.json({
            updatedHospital
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Error'
        })
    }
}

exports.removeHospital = async (req, res) => {

    const { id } = req.params;

    try {
        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                msg: 'Ops, this id doesnt exist'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Error'
        });
    }


}