const express = require('express');
const router = express.Router();

const CategoriaController = require('../controllers/CategoriaController');
const checkAuth = require('../middlewares/checkAuth');

router.post('/', checkAuth, CategoriaController.create);
router.put('/', checkAuth, CategoriaController.update);
router.delete('/:id', checkAuth, CategoriaController.delete);
router.get('/', checkAuth, CategoriaController.getAll);
router.get('/:id', checkAuth, CategoriaController.getOne);

module.exports = router;
