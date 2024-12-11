const express = require('express');
const { generateDiscountCode, getAdminReport } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.post('/generate-discount', authMiddleware, adminMiddleware, generateDiscountCode);
router.get('/report', authMiddleware, adminMiddleware, getAdminReport);

module.exports = router;
