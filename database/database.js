const Sequelize = require('sequelize');

const connection = new Sequelize(
    'DB-Ferramentaria', // Nome do banco de dados alterado
    'Felipe',
    'SenhaFelipe1!', // Coloque sua senha aqui
    {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;


