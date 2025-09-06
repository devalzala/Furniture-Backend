const Product = require("../models/productSchema");
const fs = require("fs");
const multer = require("multer");
const { status, messages } = require('../utils/index');

// Multer setup (used in routes)
exports.upload = multer({ dest: "uploads/" });

// Helper: convert uploaded file to base64
function fileToBase64(file) {
    const fileData = fs.readFileSync(file.path);
    const base64 = fileData.toString("base64");
    fs.unlinkSync(file.path); // remove temp file
    return { data: base64, contentType: file.mimetype };
}

// CREATE Product
exports.createProduct = async (req, res) => {
    try {
        let imageData = [];

        if (req.files && req.files.length > 0) {
            imageData = req.files.map((file) => fileToBase64(file).data);
        }

        const product = new Product({
            ...req.body,
            images: imageData
        });

        await product.save();

        res.status(status.OK).json({
            message: messages.PRODUCT_CREATED_SUCCESSFULLY,
            product,
        });
    } catch (error) {
        res.status(status.InternalServerError).json({
            message: "Failed to create product",
            error: error.message,
        });
    }
};


// READ All Products (not deleted)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: 0 });
        const totalCount = await Product.countDocuments({ isDeleted: 0 })

        res.status(status.OK).json({
            message: messages.PRODUCT_FATCHED_SUCCESSFULLY,
            totalCount,
            data: products,
        });
    } catch (error) {
        res.status(status.InternalServerError).json({
            message: "Failed to fetch products"
        });
    }
};

// READ Single Product by ID (not deleted)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, isDeleted: 0 });
        if (!product) {
            return res.status(status.NotFound).json({ message: "Product not found" });
        }
        res.status(status.OK).json({
            message: messages.PRODUCT_FATCHED_SUCCESSFULLY,
            product
        });
    } catch (error) {
        // Only show a generic message, not the full error
        res.status(status.InternalServerError).json({
            message: "Failed to fetch product - Invalid product ID"
        });
    }
};

// UPDATE Product
exports.updateProduct = async (req, res) => {
    try {
        let updateData = { ...req.body };

        // Convert uploaded images
        let newImages = [];
        if (req.files && req.files.length > 0) {
            newImages = req.files.map((file) => fileToBase64(file).data);
        }

        // Build update object
        let updateQuery = { $set: updateData };
        if (newImages.length > 0) {
            updateQuery.$push = { images: { $each: newImages } };
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateQuery,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found. Update failed.",
            });
        }

        res.status(status.OK).json({
            message: messages.PRODUCT_UPDATED_SUCCESSFULLY,
            product,
        });
    } catch (error) {
        console.log(error);
        
        res.status(status.InternalServerError).json({
            message: "Failed to update product",
            error: error.message,
        });
    }
};


// SOFT DELETE Product
exports.deleteProduct = async (req, res) => {
    try {
        // Find product by ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(status.NotFound).json({ message: "Product not found" });
        }

        // Check if already deleted
        if (product.isDeleted === 1) {
            return res.status(status.BadRequest).json({ message: "Product is already deleted" });
        }

        // Soft delete
        product.isDeleted = 1;
        await product.save();

        res.status(status.OK).json({
            message: messages.PRODUCT_DELETED_SUCCESSFULLY,
            product
        });
    } catch (error) {
        res.status(status.InternalServerError).json({
            message: "Failed to delete product"
        });
    }
};
