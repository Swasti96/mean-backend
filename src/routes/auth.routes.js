/*
 Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { login, googleSignIn, renewToken } = require('../controllers/auth.controllers');
const { validateJwt } = require('../helpers/validate_jwt');
const { fieldsValidator } = require('../middlewares/fieldValidator');


router.post('/',
    [
        check('email', 'Email is a require field').isEmail(),
        check('password', 'Password is a required field').not().isEmpty(),
        fieldsValidator
    ],
    login
);


router.post('/google',
    [
        check('token', 'Token is a required field').not().isEmpty(),
        fieldsValidator
    ],
    googleSignIn
);
router.get('/renew',
    validateJwt,
    renewToken
)

module.exports = router;