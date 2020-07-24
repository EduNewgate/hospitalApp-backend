const fs = require('fs');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const deletePreviewsFiles = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const updateFile = async(tabla, id, fileName) => {
    let pathAntiguo = '';
    switch (tabla) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }

            pathAntiguo = `./uploads/usuarios/${usuario.img}`;
            deletePreviewsFiles(pathAntiguo);

            usuario.img = fileName;
            usuario.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }

            pathAntiguo = `./uploads/hospitales/${hospital.img}`;
            deletePreviewsFiles(pathAntiguo);

            hospital.img = fileName;
            hospital.save();
            return true;

        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }

            pathAntiguo = `./uploads/medicos/${medico.img}`;
            deletePreviewsFiles(pathAntiguo);

            medico.img = fileName;
            medico.save();
            return true;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, medicos u hospitales.'
            });
    }
};

module.exports = {
    updateFile,
};