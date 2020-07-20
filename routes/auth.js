const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

/*
    /api/login
*/
const router = Router();

router.post('/', [
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email no tiene el formato correcto.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos
], login)


module.exports = router;