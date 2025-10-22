const Sequelize = require('sequelize');
const connection = require('../database/database');

const Usuario = connection.define('usuario', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// Cria a tabela automaticamente se não existir
Usuario.sync({ force: false })
    .then(() => console.log('Tabela "usuario" criada ou já existente'))
    .catch((erro) => console.log('Erro ao criar tabela "usuario":', erro));

module.exports = Usuario;