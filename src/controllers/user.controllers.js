const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJwt } = require('../helpers/jwt');

exports.getUsers = async (req, res) => {

    const pageNumber = Number(req.query.pageNumber) || 0;

    const [users, total] = await Promise.all([
        User.find()
            .skip(pageNumber)
            .limit(5),

        User.countDocuments()
    ]);

    res.json({
        users,
        total
    })
}

exports.createUser = async (req, res) => {
    const { name, lastName, email, password } = req.body;

    try {

        const emailAlreadyExist = await User.findOne({ email });

        if (emailAlreadyExist) {
            return res.status(400).json({
                msg: 'El email ya esta registrado'
            });
        }


        const user = new User({
            name,
            lastName,
            email,
            password
        });

        //Encrypt password
        const salt = bcryptjs.genSaltSync(); //Data aleatoria
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();

        //Generar TOKEN
        const token = await createJwt(user.id)

        res.status(201).json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

exports.updateUser = async (req, res) => {

    const { id } = req.params;
    const { password, google, email, ...fields } = req.body;

    try {

        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({
                msg: 'El usuario no existe'
            });
        }

        if (userExist.email !== email) {

            const existEmail = await User.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        fields.email = email;

        const userUpdated = await User.findByIdAndUpdate(id, fields, { new: true });

        res.json({
            user: userUpdated
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
}

exports.removeUser = async (req, res) => {

    const { id } = req.params;

    try {

        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({
                msg: 'El usuario no existe'
            });
        }


        await User.findByIdAndDelete(id);

        res.json({
            id,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
}