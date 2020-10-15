const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJwt } = require('../helpers/jwt');

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(400).json({
                msg: 'Email fail'
            })
        }

        //Verificar password
        const validPassowrd = bcryptjs.compareSync(password, userDB.password);

        if (!validPassowrd) {
            return res.status(400).json({
                msg: 'Password fail'
            });
        }

        //Generar TOKEN
        const token = await createJwt(userDB._id)

        res.json({
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
}