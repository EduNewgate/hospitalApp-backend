const { response } = require('express');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = async(req, res = response) => {

    const id = req.id;
    const hospital = new Hospital({
        usuario: id,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarHospital = async(req, res = response) => {

    //const usuarios = await Hospital.find({}, 'nombre email role google');

    res.json({
        ok: true,
        msg: 'actualizar Hospitales'
    });
}

const borrarHospital = async(req, res = response) => {

    //const usuarios = await Hospital.find({}, 'nombre email role google');

    res.json({
        ok: true,
        msg: 'borrar Hospitales'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}