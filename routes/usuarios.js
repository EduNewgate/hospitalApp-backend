const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/*
    /api/usuarios
*/

router.get('/', getUsuarios);
router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto.').isEmail(),
    validarCampos
], crearUsuario);
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto.').isEmail(),
    check('role', 'El rol es obligatorio.').not().isEmpty(),
    validarCampos,
], actualizarUsuario);
router.delete('/:id', validarJWT, borrarUsuario);

module.exports = router;