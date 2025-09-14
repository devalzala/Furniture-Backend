const express = require("express");
const router = express.Router();
const { addOrUpdateWishlist, getWishlistByUserId } = require("../controllers/wishlistController");

// Add product to wishlist
router.post("/add", addOrUpdateWishlist);

// Get wishlist by user ID
router.get("/getWishList", getWishlistByUserId);

module.exports = router;