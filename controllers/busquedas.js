const { response } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const { populate } = require('../models/usuario');

const getResultados = async(req, res = response) => {

    const data = req.params.dataSearch;
    const regex = new RegExp(data, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }, 'nombre email role google'),
        Hospital.find({ nombre: regex }, 'nombre img'),
        Medico.find({ nombre: regex }, 'nombre img')
    ]);

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const dataSearch = req.params.dataSearch;
    const regex = new RegExp(dataSearch, 'i');

    let data = [];

    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img');
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, medicos u hospitales.'
            });
    }

    res.status(200).json({
        ok: true,
        data
    });

}

module.exports = {
    getResultados,
    getDocumentosColeccion
}