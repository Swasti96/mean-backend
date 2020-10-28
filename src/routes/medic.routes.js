/*
    Path '/api/medics'
*/
const { Router } = require('express');
const router = Router();
const { getMedics, createMedic, updateMedic, removeMedic, getMedicById } = require('../controllers/medics.controllers');
const { fieldsValidator } = require('../middlewares/fieldValidator');
const { validateJwt } = require('../helpers/validate_jwt');
const { check } = require('express-validator');

router.get('/',
    [validateJwt],
    getMedics
);
router.get('/:id',
    [validateJwt],
    getMedicById
);
router.post('/add-medic',
    [
        validateJwt,
        check('name', 'Name is a required field').not().isEmpty(),
        check('hospital', 'Hospital id must be a valid id').isMongoId(),
        fieldsValidator
    ],
    createMedic
);
router.put('/update-medic/:id',
    [
        validateJwt,
        check('name', 'Name is a required field').not().isEmpty(),
        check('hospital', 'Hospital id must be a valid id').isMongoId(),
        fieldsValidator
    ],
    updateMedic
);
router.delete('/remove-medic/:id',
    validateJwt,
    removeMedic
);




module.exports = router;
