const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.validateJwt = (req, res, next) => {

    //Read token from header
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'Unauthorized'
        })
    }

    try {

        const { id } = jwt.verify(token, process.env.KEY);
        req.id = id;
        next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Incorrect Token'
        })
    }

}


exports.validate_ADMIN_ROLE = async (req, res, next) => {

    const uid = req.id;
    const { id } = req.params;
    try {

        const userDB = await User.findById(uid);


        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User not exist'
            });
        }
        if (userDB.rol === 'ADMIN_ROL' && uid === id) {

            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'You need authorization'
            });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Internal Server Error'
        })
    }

}