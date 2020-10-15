const jwt = require('jsonwebtoken');

exports.createJwt = (id) => {
    return new Promise((resolve, reject) => {

        const payload = {
            id
        };

        jwt.sign(payload, process.env.KEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puedo generar Token');
            } else {
                resolve(token);
            }
        });

    })


}