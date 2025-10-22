// Centraliza associações entre modelos
const Usuario = require('./usuario');
const Categoria = require('./categoria');
const Ferramenta = require('./ferramenta');

// Associações: Usuario <-> Categoria
Categoria.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Usuario.hasMany(Categoria, { foreignKey: 'usuarioId', as: 'categorias' });

// Associações: Usuario <-> Ferramenta
Ferramenta.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Usuario.hasMany(Ferramenta, { foreignKey: 'usuarioId', as: 'ferramentas' });

// Associações: Categoria <-> Ferramenta
Ferramenta.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Ferramenta, { foreignKey: 'categoriaId', as: 'ferramentas' });

// Exporta para conveniência (caso queira usar require('../models'))
module.exports = {
    Usuario,
    Categoria,
    Ferramenta
};