const Categoria = require('../models/categoria');

// Criar categoria (associa a categoria ao usuário logado)
exports.create = (req, res, next) => {
    const { descricao } = req.body;
    const usuarioId = req.userData && req.userData.id;

    if (!descricao) {
        return res.status(400).json({ mensagem: 'O campo descrição é obrigatório' });
    }
    if (!usuarioId) {
        return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    Categoria.findOne({ where: { descricao, usuarioId } })
        .then(categoria => {
            if (!categoria) {
                return Categoria.create({ descricao, usuarioId })
                    .then(categoriaCadastrada => {
                        res.status(201).json({
                            mensagem: 'Categoria cadastrada com sucesso!',
                            categoria: categoriaCadastrada
                        });
                    });
            } else {
                return res.status(409).json({ mensagem: 'Categoria já cadastrada!' });
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao cadastrar categoria!' });
        });
};

// Atualizar categoria (apenas se pertencer ao usuário)
exports.update = (req, res, next) => {
    const { id, descricao } = req.body;
    const usuarioId = req.userData && req.userData.id;

    if (!id || !descricao) {
        return res.status(400).json({ mensagem: 'Campos não definidos' });
    }
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    Categoria.update({ descricao }, { where: { id, usuarioId } })
        .then(resultado => {
            if (resultado[0] === 1) {
                res.status(200).json({ mensagem: 'Categoria alterada com sucesso!' });
            } else {
                res.status(404).json({ mensagem: 'Categoria não encontrada!' });
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao alterar categoria!' });
        });
};

// Excluir categoria (apenas se pertencer ao usuário)
exports.delete = (req, res, next) => {
    const { id } = req.params;
    const usuarioId = req.userData && req.userData.id;

    if (!id) return res.status(400).json({ mensagem: 'ID não definido' });
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    Categoria.destroy({ where: { id, usuarioId } })
        .then(resultado => {
            if (resultado === 1) {
                res.status(200).json({ mensagem: 'Categoria excluída com sucesso!' });
            } else {
                res.status(404).json({ mensagem: 'Categoria não encontrada!' });
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao excluir categoria!' });
        });
};

// Listar todas as categorias do usuário logado
exports.getAll = (req, res, next) => {
    const usuarioId = req.userData && req.userData.id;
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    Categoria.findAll({
        where: { usuarioId },
        order: [['descricao', 'ASC']],
        attributes: ['id', 'descricao']
    })
    .then(categorias => {
        res.status(200).json({ mensagem: 'Categorias encontradas', categorias });
    })
    .catch(erro => {
        console.log(erro);
        res.status(500).json({ mensagem: 'Erro ao listar categorias!' });
    });
};

// Buscar categoria pelo ID (apenas se pertencer ao usuário)
exports.getOne = (req, res, next) => {
    const { id } = req.params;
    const usuarioId = req.userData && req.userData.id;

    if (!id) return res.status(400).json({ mensagem: 'ID não definido' });
    if (!usuarioId) return res.status(401).json({ mensagem: 'Usuário não autenticado' });

    Categoria.findOne({ where: { id, usuarioId }, attributes: ['id', 'descricao'] })
        .then(categoria => {
            if (categoria) {
                res.status(200).json({ mensagem: 'Categoria encontrada', categoria });
            } else {
                res.status(404).json({ mensagem: 'Categoria não encontrada!' });
            }
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao buscar categoria!' });
        });
};