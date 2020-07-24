const { Router } = require('express');
const { getResultados, getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
    /api/search
*/
router.get('/:dataSearch', validarJWT, getResultados);
router.get('/coleccion/:tabla/:dataSearch', validarJWT, getDocumentosColeccion);

module.exports = router;