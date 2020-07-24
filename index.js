const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db/config');

// Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// DB
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/search', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor levantado en el puerto ' + process.env.PORT);
});