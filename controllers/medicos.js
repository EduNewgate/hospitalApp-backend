const { response } = require('express');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        medicos
    });
}

const crearMedico = async(req, res = response) => {

    const id = req.id;
    const medico = new Medico({
        usuario: id,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarMedico = async(req, res = response) => {

    //const usuarios = await Medico.find({}, 'nombre email role google');

    res.json({
        ok: true,
        msg: 'actualizar Medicos'
    });
}

const borrarMedico = async(req, res = response) => {

    //const usuarios = await Medico.find({}, 'nombre email role google');

    res.json({
        ok: true,
        msg: 'borrar Medicos'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}