const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario'); // corrigido
const utils = require('../utils/utils');      // corrigido
const { where } = require('sequelize');

// padrão
exports.create = (req, res, next) => {
    const { email, nome, senha } = req.body;

    if (!email || !nome || !senha) {
        return res.status(400).json({ mensagem: 'Campos não definidos' });
    }

    bcrypt.hash(senha, 10).then(senhaCriptografada => {
        Usuario.findOne({ where: { email } }).then(usuario => {
            if (!usuario) {
                Usuario.create({ nome, email, senha: senhaCriptografada })
                    .then(usuarioCadastrado => {
                        res.status(201).json({
                            mensagem: 'Usuário cadastrado com sucesso!',
                            usuario: {
                                id: usuarioCadastrado.id,
                                nome: usuarioCadastrado.nome,
                                email: usuarioCadastrado.email
                            }
                        });
                    }).catch(erro => {
                        console.log(erro);
                        res.status(500).json({ mensagem: 'Erro ao cadastrar usuário!' });
                    });
            } else {
                res.status(401).json({ mensagem: 'E-mail já cadastrado!' });
            }
        });
    });
};

exports.update = (req, res, next) => {
    const { id, email, nome } = req.body;
    if (!id || !email || !nome) return res.status(400).json({ mensagem: 'Campos não definidos' });

    Usuario.update({ email, nome }, { where: { id } })
        .then(() => res.status(200).json({ mensagem: 'Usuário alterado com sucesso!' }))
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao alterar usuário!' });
        });
};

exports.delete = (req, res, next) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ mensagem: 'Campos não definidos' });

    Usuario.destroy({ where: { id } })
        .then(() => res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' }));
};

exports.getAll = (req, res, next) => {
    Usuario.findAll({ order: [['nome', 'ASC']], attributes: ['id', 'nome', 'email'] })
        .then(usuarios => res.status(200).json({ mensagem: 'Usuários encontrados', usuarios }));
};

exports.getOne = (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ mensagem: 'Campos não definidos' });

    Usuario.findByPk(id, { attributes: ['id', 'nome', 'email'] })
        .then(usuario => res.status(200).json({ mensagem: 'Usuário encontrado', usuario }));
};

// específico
exports.login = (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || !senha) return res.status(400).json({ mensagem: 'Campos não definidos' });

    let usuarioEncontrado;

    Usuario.findOne({ where: { email } })
        .then(usuario => {
            if (!usuario) return res.status(401).json({ mensagem: 'Credenciais inválidas!' });
            usuarioEncontrado = usuario;
            return bcrypt.compare(senha, usuario.senha);
        })
        .then(resultado => {
            if (!resultado) return res.status(401).json({ mensagem: 'Credenciais inválidas!' });

            const token = jwt.sign(
                { email: usuarioEncontrado.email, id: usuarioEncontrado.id },
                utils.JWT_KEY,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                token,
                expiresIn: 3600,
                usuarioId: usuarioEncontrado.id,
                usuarioEmail: usuarioEncontrado.email
            });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({ mensagem: 'Erro ao efetuar login!' });
        });
};

exports.changePassword = (req, res, next) => {
    const { id, senha } = req.body;
    if (!id || !senha) return res.status(400).json({ mensagem: 'Campos não definidos' });

    bcrypt.hash(senha, 10)
        .then(senhaCriptografada => Usuario.update({ senha: senhaCriptografada }, { where: { id } }))
        .then(() => res.status(201).json({ mensagem: 'Senha alterada com sucesso!' }));
};
