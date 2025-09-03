const express = require("express");
const router = express.Router();
const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// -----------------
// Auth Routes
// -----------------

// Register a new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Forgot password - send reset link via email
router.post("/forgot-password", forgotPassword);

// Reset password - set new password using token
router.post("/reset-password", resetPassword);

module.exports = router;
