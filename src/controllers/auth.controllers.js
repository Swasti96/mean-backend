const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { createJwt } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google_verify');
const { getMenuFrontEnd } = require('../helpers/menu_frontend');

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(400).json({
                msg: 'Wrong email'
            })
        }

        //Verificar password
        const validPassowrd = bcryptjs.compareSync(password, userDB.password);

        if (!validPassowrd) {
            return res.status(400).json({
                msg: 'Wrong password'
            });
        }

        //Generar TOKEN
        const token = await createJwt(userDB._id)

        res.json({
            token,
            menu: getMenuFrontEnd(userDB.rol)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado'
        });
    }
}

exports.googleSignIn = async (req, res) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const userDB = await User.findOne({ email });

        let user;

        if (!userDB) {
            //If user doesnt exist 
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //If user exist
            user = userDB;
            user.google = true;
            // user.password = '@@@';
        }

        await user.save();

        //Generar TOKEN
        const token = await createJwt(user._id);

        res.json({
            msg: 'Google SignIn',
            token,
            menu: getMenuFrontEnd(user.rol)
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Wrong token!!'
        });
    }


}

exports.renewToken = async (req, res) => {

    const id = req.id;

    //Generar TOKEN
    const token = await createJwt(id);

    const user = await User.findById(id);

    res.json({
        token,
        user,
        menu: getMenuFrontEnd(user.rol)
    })

}