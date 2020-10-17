/*
    Path: '/api/upload'
*/
const { Router } = require('express');
const router = Router();
const { validateJwt } = require('../helpers/validate_jwt');
const { fileUploader, getFiles } = require('../controllers/uploads.controllers');
const expressFileUpload = require('express-fileupload');

router.use(expressFileUpload());

router.put('/:type/:id',
    validateJwt,
    fileUploader
);

router.get('/:type/:filename',
    getFiles
);


module.exports = router