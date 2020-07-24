const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.param.limit) || 5;

    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(limit),

        Usuario.countDocuments()
    ]);

    res.json({
        total,
        ok: true,
        usuarios,
        id: req.id
    });
}

const crearUsuario = async(req, res = response) => {
    const { nombre, email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email, email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe.'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id);
        res.status(200).json({
            ok: true,
            usuario: usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuairo correcto.

    const id = req.params.id;
    const { password, google, email, ...campos } = req.body;

    try {

        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario con el id ' + id + ' no existe.'
            });
        }

        if (usuarioDB.email !== req.body.email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El email ya existe.'
                });
            }
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new: true });

        res.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async(req, res = response) => {
    const id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario con el id ' + id + ' no existe.'
            });
        }

        await Usuario.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}