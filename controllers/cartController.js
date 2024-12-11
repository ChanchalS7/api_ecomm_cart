const Cart = require('../models/Cart');

// Add to Cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

    const productIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Get Cart
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

// Remove from Cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};
