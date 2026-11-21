const express = require('express');
const router = express.Router();
const ProductImageController = require('../controllers/ProductImageController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/', AuthMiddleware, ProductImageController.create);
router.get('/:productId', ProductImageController.findAll);
router.delete('/:id', AuthMiddleware, ProductImageController.delete);

module.exports = router;