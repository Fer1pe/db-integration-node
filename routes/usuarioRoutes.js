const express = require('express');

const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');
const checkAuth = require('../middlewares/checkAuth');

// Login continua sem autenticação
router.post('/login', UsuarioController.login);

// Criar usuário sem autenticação
router.post('/', UsuarioController.create);

// Rotas que alteram dados continuam protegidas
router.post('/trocarSenha', checkAuth, UsuarioController.changePassword);
router.put('/', checkAuth, UsuarioController.update);
router.delete('/', checkAuth, UsuarioController.delete);
router.get('/', checkAuth, UsuarioController.getAll);
router.get('/:id', checkAuth, UsuarioController.getOne);

module.exports = router;

