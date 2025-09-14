const express = require("express");
const router = express.Router();
const {
  createAddress,
  getAllAddresses,
  getAddressesByUserId,
  updateAddress,
  deleteAddress
} = require("../controllers/addressController");

// Create Address
router.post("/create", createAddress);

// Get All Addresses
router.get("/all", getAllAddresses);

// Get Addresses by User ID
router.get("/user", getAddressesByUserId);

// Update Address by ID
router.put("/update/:id", updateAddress);

// Delete Address by ID
router.delete("/delete/:id", deleteAddress);

module.exports = router;
