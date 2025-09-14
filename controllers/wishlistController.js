const Wishlist = require("../models/wishlistSchema");
const Product = require("../models/productSchema");
const { status, messages } = require('../utils/index');

// Add / Update / Delete Wishlist
exports.addOrUpdateWishlist = async (req, res) => {
  try {
    const { userId, productIds } = req.body;

    // Validate input
    if (!userId || !Array.isArray(productIds)) {
      return res.status(status.BadRequest).json({
        message: "userId and productIds array are required"
      });
    }

    let wishlist = await Wishlist.findOne({ userId });

    // Case: Empty array → delete wishlist
    if (productIds.length === 0) {
      if (wishlist) {
        await Wishlist.deleteOne({ userId });
      }
      return res.status(status.OK).json({
        message: messages.WISHLIST_CLEARED_SUCCESSFULLY
      });
    }

    // Fetch products from DB
    const products = await Product.find({ _id: { $in: productIds } });

    // Map to snapshot
    const productSnapshots = products.map(p => ({
      productId: p._id.toString(),
      name: p.name,
      vendor: p.vendor,
      sellingPrice: p.sellingPrice,
      description: p.description,
      dimensions: p.dimensions,
      sku: p.sku,
      category: p.category,
      tags: p.tags,
      images: p.images
    }));

    // Create or update wishlist
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: productSnapshots });
    } else {
      wishlist.products = productSnapshots;
    }

    await wishlist.save();

    res.status(status.OK).json({
      message: messages.WISHLIST_UPDATED_SUCCESSFULLY,
      wishlist
    });
  } catch (err) {
    console.error("Add/Update Wishlist Error:", err);
    res.status(status.InternalServerError).json({
      message: "Server error",
      error: err.message
    });
  }
};

// Get Wishlist by User ID
exports.getWishlistByUserId = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(status.BadRequest).json({ message: "userId is required" });
    }

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(status.NotFound).json({ message: messages.WISHLIST_NOT_FOUND });
    }

    res.status(status.OK).json({
      message: messages.WISHLIST_FETCHED_SUCCESSFULLY,
      wishlist
    });
  } catch (err) {
    console.error("Get Wishlist Error:", err);
    res.status(status.InternalServerError).json({ message: "Server error", error: err.message });
  }
};
