/*
 Path: '/api/login'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { login } = require('../controllers/auth.controllers');
const { fieldsValidator } = require('../middlewares/fieldValidator'); 


router.post('/',
    [
        check('email', 'Email is a require field').isEmail(),
        check('password', 'Password is a require field').not().isEmpty(),
        fieldsValidator
    ],
    login
);



module.exports = router;