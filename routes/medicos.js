const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
    /api/medicos
*/
router.get('/', getMedicos);
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('hospital', 'El ID del hospital no es válido').isMongoId(),
    validarCampos
], crearMedico);
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('hospital', 'El ID del hospital no es válido').isMongoId(),
    validarJWT
], actualizarMedico);
router.delete('/:id', validarJWT, borrarMedico);

module.exports = router;