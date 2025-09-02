const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Multer setup for image uploads
const upload = multer({ dest: "uploads/" });

// Routes
// CREATE product
router.post("/create", upload.single("image"), createProduct);

// GET all products
router.get("/", getProducts);

// GET single product by ID
router.get("/:id", getProductById);

// UPDATE product by ID
router.put("/:id", upload.single("image"), updateProduct);

// DELETE product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
