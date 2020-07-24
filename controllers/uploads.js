const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateFile } = require('../helpers/updateFile');
const path = require('path');
const fs = require('fs');

/*var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));*/

const fileUpload = async(req, res = response) => {
    const tabla = req.params.tabla;
    const id = req.params.id;

    const tiposValidos = ["usuarios", "medicos", "hospitales"];
    if (!tiposValidos.includes(tabla)) {
        return res.status(400).json({
            ok: false,
            msg: "No es un médico, usuario u hospital.",
        });
    }

    // Validar que existe archivo.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo'
        });
    }

    // Procesar archivo.
    const file = req.files.img;
    const extension = file.name.split('.')[file.name.split('.').length - 1];

    //Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: "No es una extensión permitida",
        });
    }

    // Generar el nombre del archivo
    const fileName = `${uuidv4()}.${extension}`;

    // Path para guardar el fichero
    const path = `./uploads/${tabla}/${fileName}`;

    // Mover fichero
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el fichero.'
            });
        }

        // Actualizar DB
        updateFile(tabla, id, fileName);

        res.json({
            ok: true,
            fileName,
            msg: 'Fichero subido correctamente'
        });
    });
};

const getFile = async(req, res = response) => {
    const tabla = req.params.tabla;
    const fileId = req.params.fileId;

    let filePath = path.join(__dirname, `../uploads/${tabla}/${fileId}`);
    if (!fs.existsSync(filePath)) {
        filePath = path.join(__dirname, `../uploads/no-img.png`);
    }
    res.sendFile(filePath);
}

module.exports = {
    fileUpload,
    getFile
};