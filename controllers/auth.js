const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        // Verificar email.
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas.'
            });
        }

        // Verificar contraseña.
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas.'
            });
        }

        // Generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const loginGoogle = async(req, res = response) => {

    const gToken = req.body.gToken;

    try {

        const { name, email, picture } = await googleVerify(gToken);

        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: true,
            msg: 'Token incorrecto'
        });
    }
}

const renewToken = async(req, res = response) => {

    const id = req.id;
    const usuarioDB = await Usuario.findById(id);

    const token = await generarJWT(id);

    res.json({
        ok: true,
        usuario: usuarioDB,
        token
    });
}

module.exports = {
    login,
    loginGoogle,
    renewToken
}