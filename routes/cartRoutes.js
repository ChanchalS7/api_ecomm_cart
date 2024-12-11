const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addToCart); // Add to Cart
router.get('/', authMiddleware, getCart); // Get Cart
router.delete('/:productId', authMiddleware, removeFromCart); // Remove from Cart

module.exports = router;
