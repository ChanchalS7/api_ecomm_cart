const Order = require('../models/Order');
const Discount = require('../models/Discount');

// Generate Discount Code
exports.generateDiscountCode = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const code = `DISCOUNT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const discount = await Discount.create({
      user: userId,
      code,
    });

    res.status(201).json({ message: 'Discount code generated', discount });
  } catch (error) {
    next(error);
  }
};

// Get Admin Report
exports.getAdminReport = async (req, res, next) => {
  try {
    const totalSales = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$finalAmount' } } }]);
    const totalOrders = await Order.countDocuments();
    const discountStats = await Discount.aggregate([{ $group: { _id: null, totalDiscount: { $sum: '$isUsed' } } }]);

    res.json({
      totalSales: totalSales[0]?.total || 0,
      totalOrders,
      discountUsed: discountStats[0]?.totalDiscount || 0,
    });
  } catch (error) {
    next(error);
  }
};
