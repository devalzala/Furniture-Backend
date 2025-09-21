const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        productId: { type: String },
        userId: { type: String },
        name: { type: String, trim: true },
        email: { type: String, lowercase: true, trim: true },
        message: { type: String, trim: true },
        images: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
