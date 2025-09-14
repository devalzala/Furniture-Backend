const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        name: { type: String, required: true },
        vendor: { type: String, trim: true },
        sellingPrice: { type: Number, min: 0 },
        description: { type: String, trim: true },
        dimensions: [
          {
              width: Number,
              height: Number,
              dimension: Number
          }
        ],
        sku: { type: String, trim: true },
        category: { type: String, trim: true },
        tags: [
          {
              type: String,
              enum: ["chair", "sofa", "leather", "vintage"]
          }
        ],
        images: [String],
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
