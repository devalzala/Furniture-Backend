// routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Controller
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to store uploaded images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes

// CREATE a new blog
// 'image' is the field name expected in the form-data
router.post("/create", upload.single("image"), createBlog);

// GET all blogs
router.get("/all", getAllBlogs);

// GET a single blog by ID
router.get("/:id", getBlogById);

// UPDATE a blog
router.put("/update/:id", upload.single("image"), updateBlog);

// DELETE a blog
router.delete("/delete/:id", deleteBlog);

module.exports = router;
