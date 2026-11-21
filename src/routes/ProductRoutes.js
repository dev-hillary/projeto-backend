const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);

router.post('/', AuthMiddleware, ProductController.create);
router.put('/:id', AuthMiddleware, ProductController.update);
router.delete('/:id', AuthMiddleware, ProductController.delete);

module.exports = router;