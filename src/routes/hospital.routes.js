/*
Path: '/api/hospitals'
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateJwt } = require('../helpers/validate_jwt');
const { fieldsValidator } = require('../middlewares/fieldValidator');
const { getHospitals, createHospital, updateHospital, removeHospital } = require('../controllers/hospital.controllers');

router.get('/',
    [
        validateJwt
    ],
    getHospitals
);
// router.get('/hospital/:id',

// );
router.post('/add-hospital',
    [
        validateJwt,
        check('name', 'Name is a required field').not().isEmpty(),
        fieldsValidator
    ],
    createHospital
);
router.put('/update-hospital/:id',
    [
        validateJwt,
        check('name', 'Name is a required field').not().isEmpty(),
        fieldsValidator
    ],
    updateHospital
);
router.delete('/remove-hospital/:id',
    validateJwt,
    removeHospital
);


module.exports = router