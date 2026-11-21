const express = require('express');
const router = express.Router();
const ProductOptionController = require('../controllers/ProductOptionController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', AuthMiddleware, ProductOptionController.create);
router.get('/:productId', ProductOptionController.findAll);
router.delete('/:id', AuthMiddleware, ProductOptionController.delete);

module.exports = router;