const Ferramenta = require('../models/ferramenta');
const Categoria = require('../models/categoria');

// Criar ferramenta (verifica que a categoria pertence ao usuário)
exports.create = (req, res, next) => {
    const { nome, descricao, fabricante, quantidade, categoriaId } = req.body;
    const usuarioId = req.userData && req.userData.id;

    if (!nome || !quantidade || !categoriaId) {
        return res.status(400).json({ 
            mensagem: 'Campos obrigatórios não preenchidos (nome, quantidade, categoriaId)' 
        });
    }
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    // Verifica se a categoria pertence ao usuário
    Categoria.findOne({ where: { id: categoriaId, usuarioId } })
        .then(cat => {
            if (!cat) return res.status(403).json({ mensagem: 'Categoria inválida ou não pertence ao usuário' });

            return Ferramenta.create({ nome, descricao, fabricante, quantidade, categoriaId, usuarioId })
                .then(ferramentaCriada => {
                    res.status(201).json({
                        mensagem: 'Ferramenta cadastrada com sucesso!',
                        ferramenta: ferramentaCriada
                    });
                });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao cadastrar ferramenta!' });
        });
};

// Atualizar ferramenta (apenas se pertencer ao usuário; verifica categoria)
exports.update = (req, res, next) => {
    const { id, nome, descricao, fabricante, quantidade, categoriaId } = req.body;
    const usuarioId = req.userData && req.userData.id;

    if (!id || !nome || !quantidade || !categoriaId) {
        return res.status(400).json({ 
            mensagem: 'Campos obrigatórios não preenchidos (id, nome, quantidade, categoriaId)' 
        });
    }
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    // Verifica se a categoria pertence ao usuário
    Categoria.findOne({ where: { id: categoriaId, usuarioId } })
        .then(cat => {
            if (!cat) return res.status(403).json({ mensagem: 'Categoria inválida ou não pertence ao usuário' });

            return Ferramenta.update(
                { nome, descricao, fabricante, quantidade, categoriaId },
                { where: { id, usuarioId } }
            ).then(resultado => {
                if (resultado[0] === 1) {
                    res.status(200).json({ mensagem: 'Ferramenta alterada com sucesso!' });
                } else {
                    res.status(404).json({ mensagem: 'Ferramenta não encontrada!' });
                }
            });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao alterar ferramenta!' });
        });
};

// Excluir ferramenta (apenas se pertencer ao usuário)
exports.delete = (req, res, next) => {
    const { id } = req.params;
    const usuarioId = req.userData && req.userData.id;
    if (!id) return res.status(400).json({ mensagem: 'ID não definido' });
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    Ferramenta.destroy({ where: { id, usuarioId } })
        .then(resultado => {
            if (resultado === 1) {
                res.status(200).json({ mensagem: 'Ferramenta excluída com sucesso!' });
            } else {
                res.status(404).json({ mensagem: 'Ferramenta não encontrada!' });
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao excluir ferramenta!' });
        });
};

// Listar todas as ferramentas do usuário logado
exports.getAll = (req, res, next) => {
    const usuarioId = req.userData && req.userData.id;
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    Ferramenta.findAll({
        where: { usuarioId },
        order: [['nome', 'ASC']],
        attributes: ['id', 'nome', 'descricao', 'fabricante', 'quantidade'],
        include: [{
            model: Categoria,
            as: 'categoria',
            required: true,
            attributes: ['id', 'descricao']
        }]
    }).then(ferramentas => {
        res.status(200).json({ mensagem: 'Ferramentas encontradas', ferramentas });
    }).catch(erro => {
        console.log(erro);
        res.status(500).json({ mensagem: 'Erro ao listar ferramentas!' });
    });
};

// Buscar ferramenta pelo ID (apenas se pertencer ao usuário)
exports.getOne = (req, res, next) => {
    const { id } = req.params;
    const usuarioId = req.userData && req.userData.id;
    if (!id) return res.status(400).json({ mensagem: 'ID não definido' });
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    Ferramenta.findOne({
        where: { id, usuarioId },
        include: [{
            model: Categoria,
            as: 'categoria',
            required: true,
            attributes: ['id', 'descricao']
        }]
    }).then(ferramenta => {
        if (ferramenta) {
            res.status(200).json({ mensagem: 'Ferramenta encontrada', ferramenta });
        } else {
            res.status(404).json({ mensagem: 'Ferramenta não encontrada!' });
        }
    }).catch(erro => {
        console.log(erro);
        res.status(500).json({ mensagem: 'Erro ao buscar ferramenta!' });
    });
};