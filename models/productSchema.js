const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        vendor: { type: String, trim: true },
        buyingPrice: { type: Number, min: 0 },
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
        images: [
            {
                data: { type: String, required: true }, // base64 string
                contentType: { type: String }
            }
        ],
        // NEW FIELD for soft delete
        isDeleted: {
            type: Number,
            enum: [0, 1],  // 0 = active, 1 = deleted
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
