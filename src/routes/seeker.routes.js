/*
    Path: '/api/all/'
*/

const { Router } = require('express');
const router = Router();
const { validateJwt } = require('../helpers/validate_jwt');
const { searchAll, searchAllByTable } = require('../controllers/seeker.controllers');

router.get('/seeker/:search',
    validateJwt,
    searchAll
);
router.get('/seeker/:table/:search',
    validateJwt,
    searchAllByTable
)




module.exports = router