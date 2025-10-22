const Sequelize = require('sequelize');
const connection = require('../database/database');

const Ferramenta = connection.define('ferramenta', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fabricante: {
        type: Sequelize.STRING,
        allowNull: true
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    // FK para o usuario que criou/possui esta ferramenta
    usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // categoriaId será criado automaticamente via associação, mas você pode declarar explicitamente se preferir:
    categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Cria a tabela automaticamente se não existir
Ferramenta.sync({ force: false })
    .then(() => console.log('Tabela "ferramenta" criada ou já existente'))
    .catch((erro) => console.log('Erro ao criar tabela "ferramenta":', erro));

module.exports = Ferramenta;