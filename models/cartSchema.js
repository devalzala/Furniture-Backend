const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productId: { type: String },
        quantity: { type: String },
        total: { type: String },
        name: { type: String, required: true },
        vendor: { type: String, trim: true },
        sellingPrice: { type: Number, min: 0 },
        discountPercentage: { type: Number, min: 0, max: 100, default: 0 },
        description: { type: String, trim: true },
        stock: { type: Number, min: 0, default: 0 },
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
        ratings: { type: Number, min: 0, max: 5, default: 0 },
        images: [String],
    },
    { timestamps: true }
);

const CartSchema = new mongoose.Schema(
    {
        product: [productSchema],
        userId: { type: String, trim: true },
        subTotal: { type: String }
    }
)

module.exports = mongoose.model("Cart", CartSchema);