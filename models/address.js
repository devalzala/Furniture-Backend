const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true, required: true },
    company: { type: String, trim: true },
    addressLine: { type: String, trim: true, required: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    phone: { type: String, trim: true, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
