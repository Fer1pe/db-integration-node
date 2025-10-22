const express = require('express');
const router = express.Router();

const FerramentaController = require('../controllers/FerramentaController');
const checkAuth = require('../middlewares/checkAuth');

router.post('/', checkAuth, FerramentaController.create);
router.put('/', checkAuth, FerramentaController.update);
router.delete('/:id', checkAuth, FerramentaController.delete);
router.get('/', checkAuth, FerramentaController.getAll);
router.get('/:id', checkAuth, FerramentaController.getOne);

module.exports = router;
