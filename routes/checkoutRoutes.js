const express = require('express');
const { checkout } = require('../controllers/checkoutController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, checkout); // Checkout API

module.exports = router;
