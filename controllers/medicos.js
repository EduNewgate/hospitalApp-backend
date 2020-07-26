const { response } = require('express');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('medico', 'nombre img');

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

    const id = req.params.id;
    userId = req.id;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un medico con ese ID.'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: userId
        }

        const newMedico = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'Medico actualizado',
            newMedico
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un medico con ese ID.'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}