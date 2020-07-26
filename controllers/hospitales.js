const { response } = require('express');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');
const hospital = require('../models/hospital');

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

    const id = req.params.id;
    userId = req.id;

    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un hospital con ese ID.'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: userId
        }

        const newHospital = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            msg: 'Hospital actualizado',
            newHospital
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
}

const borrarHospital = async(req, res = response) => {

    const id = req.params.id;

    try {
        const hospitalDB = await Hospital.findById(id);
        if (!hospitalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un hospital con ese ID.'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}