const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db/config');

// Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

// DB
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        mgs: 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor levantado en el puerto ' + process.env.PORT);
});