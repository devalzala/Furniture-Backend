const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
} = require("../controllers/contactController");

// Create new contact entry
router.post("/create", createContact);

// Get all contact entries
router.get("/get", getContacts);

module.exports = router;
