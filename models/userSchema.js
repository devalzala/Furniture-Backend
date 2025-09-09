const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    bussinessName: { type: String, trim: true },
    GSTIN: { type: String, trim: true },
    industrySegment: { type: String, trim: true },
    addressLineOne: { type: String, trim: true },
    addressLineTwo: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    dob: { type: Date }, // Date of Birth
    mobile: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "User", "Vendor"],
      default: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
