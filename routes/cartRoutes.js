const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCart,
} = require("../controllers/cartController");

// Routes
router.post("/add", addToCart);
router.get("/:userId", getCart);
router.put("/update", updateCart);

module.exports = router;
