/*
 Path: '/api/users'
*/

const { Router } = require('express');
const { getUsers, createUser, updateUser, removeUser } = require('../controllers/user.controllers');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fieldValidator');
const { validateJwt, validate_ADMIN_ROLE,validate_ADMIN_ROLE_same_user } = require('../helpers/validate_jwt');
const router = Router();


router.get('/',
    validateJwt,
    getUsers
);
// router.get('/',

// );
router.post('/add-user',
    [
        check('name', 'Name is a require field').not().isEmpty(),
        check('email', 'Email is a require field').isEmail(),
        check('password', 'Password is a require field').not().isEmpty(),
        fieldsValidator
    ],
    createUser
);
router.put('/update-user/:id',

    [
        validateJwt,
        validate_ADMIN_ROLE_same_user,
        check('name', 'Name is a require field').not().isEmpty(),
        check('email', 'Email is a require field').isEmail(),
        check('rol', 'Role is a require field').not().isEmpty(),
        fieldsValidator
    ],
    updateUser
);
router.delete('/remove-user/:id',
    [
        validateJwt,
        validate_ADMIN_ROLE,
    ],
    removeUser
);


module.exports = router;