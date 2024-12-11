const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Discount = require('../models/Discount');

// Checkout API
exports.checkout = async (req, res, next) => {
  try {
    const { discountCode } = req.body;

    // Fetch user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    let totalAmount = 0;
    cart.items.forEach((item) => {
      totalAmount += item.product.price * item.quantity;
    });

    // Apply discount if a valid code is provided
    let discountAmount = 0;
    if (discountCode) {
      const discount = await Discount.findOne({ code: discountCode, user: req.user._id, isUsed: false });
      if (discount) {
        discountAmount = (totalAmount * 10) / 100;
        discount.isUsed = true;
        await discount.save();
      } else {
        return res.status(400).json({ message: 'Invalid or already used discount code' });
      }
    }

    const finalAmount = totalAmount - discountAmount;

    // Save the order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount,
      discountAmount,
      finalAmount,
    });

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    next(error);
  }
};
