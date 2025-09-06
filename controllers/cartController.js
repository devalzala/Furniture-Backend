const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");


// 🛒 1. Add to Cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: "userId and products array are required" });
    }

    // ✅ Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "Invalid user. User not found." });
    }

    let cart = await Cart.findOne({ userId });

    for (const item of products) {
      // ✅ Check if product exists
      const productData = await Product.findById(item.productId);
      if (!productData) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      const quantity = parseInt(item.quantity);
      if (quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be greater than 0" });
      }

      const price = productData.sellingPrice;
      const total = price * quantity;

      if (!cart) {
        cart = new Cart({
          userId,
          product: [],
          subTotal: "0"
        });
      }

      const productIndex = cart.product.findIndex(
        (p) => p.productId.toString() === item.productId.toString()
      );

      if (productIndex > -1) {
        // Update existing
        cart.product[productIndex].quantity =
          parseInt(cart.product[productIndex].quantity) + quantity;
        cart.product[productIndex].total =
          parseFloat(cart.product[productIndex].total) + total;
      } else {
        // Add new
        cart.product.push({
          productId: productData._id,
          name: productData.name,
          quantity: quantity.toString(),
          total: total.toString(),
          sellingPrice: price,
          vendor: productData.vendor,
          description: productData.description,
          sku: productData.sku,
          category: productData.category,
          tags: productData.tags,
          ratings: productData.ratings,
          images: productData.images
        });
      }
    }

    // ✅ Update subtotal
    cart.subTotal = cart.product
      .reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0)
      .toString();

    await cart.save();
    res.status(200).json({ message: "Products added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

// 🛒 2. Get Cart by User
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: "userId and products array are required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Build a new product array for cart
    const updatedProducts = [];

    for (const item of products) {
      const productData = await Product.findById(item.productId);
      if (!productData) continue; // skip if product not found

      const quantity = parseInt(item.quantity) || 1;
      updatedProducts.push({
        productId: productData._id,
        name: productData.name,
        quantity: quantity.toString(),
        total: (productData.sellingPrice * quantity).toString(),
        sellingPrice: productData.sellingPrice,
        vendor: productData.vendor,
        description: productData.description,
        sku: productData.sku,
        category: productData.category,
        tags: productData.tags,
        ratings: productData.ratings,
        images: productData.images
      });
    }

    // Replace cart.product with updatedProducts → remove all others
    cart.product = updatedProducts;

    // Recalculate subtotal
    cart.subTotal = cart.product
      .reduce((acc, curr) => acc + parseFloat(curr.total || 0), 0)
      .toString();

    // If no products → delete cart
    if (cart.product.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Cart is empty and removed from database" });
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", cart });

  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};