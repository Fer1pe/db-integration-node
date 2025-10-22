const Sequelize = require('sequelize');
const connection = require('../database/database');

const Categoria = connection.define('categoria', {
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // FK para o usuario que criou/possui esta categoria
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Cria a tabela automaticamente se não existir
Categoria.sync({ force: false })
    .then(() => console.log('Tabela "categoria" criada ou já existente'))
    .catch((erro) => console.log('Erro ao criar tabela "categoria":', erro));

module.exports = Categoria;