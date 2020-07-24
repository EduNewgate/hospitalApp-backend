const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, getFile } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
    /api/uploads
*/
router.use(expressFileUpload());
router.put('/:tabla/:id', validarJWT, fileUpload);
router.get('/:tabla/:fileId', getFile);

module.exports = router;