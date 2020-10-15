const jwt = require('jsonwebtoken');

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