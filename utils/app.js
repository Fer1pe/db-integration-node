require('../models');

const express = require('express');
const app = express();
const connection = require('../database/database');

// Models
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Ferramenta = require('../models/ferramenta');


// Routes imports
const usuariosRoutes = require('../routes/usuarioRoutes');
const categoriaRoutes = require('../routes/categoriaRoutes');
const ferramentaRoutes = require('../routes/ferramentaRoutes');

// Environment setup
// Forms parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados!');
    })
    .catch((error) => {
        console.log(error);
    });

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, Accept, X-Requested-With, Authorization');
    next();
});

// Using routes
app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/ferramentas', ferramentaRoutes);

module.exports = app;