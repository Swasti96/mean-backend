const User = require('../models/user');
const Hospital = require('../models/hospitlal');
const Medic = require('../models/medic');

exports.searchAll = async (req, res) => {
    const { search } = req.params;
    const regexp = new RegExp(search, 'i');

    const [user, hospital, medic] = await Promise.all([
        User.find({ name: regexp }),
        Hospital.find({ name: regexp }),
        Medic.find({ name: regexp })
    ])

    res.json({
        user,
        hospital,
        medic
    })
}


exports.searchAllByTable = async (req, res) => {
    const { search, table } = req.params;
    const regexp = new RegExp(search, 'i');

    let data;

    switch (table) {
        case 'medics':
            data = await Medic.find({ name: regexp })
                .populate('user', 'name')
                .populate('hospital', 'name')
            break;
        case 'hospitals':
            data = await Hospital.find({ name: regexp })
                .populate('user', 'name')
            break;
        case 'users':
            data = await User.find({ name: regexp });
            break;
        default:
            return res.status(400).json({
                msg: 'Sorry,only works with this tables medics/hospitals/users'
            })
    }

    res.json({
        result: data
    });

}