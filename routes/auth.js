const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/auth');
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
], login);

router.post('/google', [
    check('gToken', 'El token de google es obligatorio.').not().isEmpty(),
    validarCampos
], loginGoogle);


module.exports = router;