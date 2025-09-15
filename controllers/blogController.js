const Blog = require("../models/blogSchema");
const fs = require("fs");
const multer = require("multer");
const { status, messages } = require('../utils/index');

// Multer setup for single image upload
exports.upload = multer({ dest: "uploads/" });

// Helper: Convert uploaded file to base64
function fileToBase64(file) {
    const fileData = fs.readFileSync(file.path);
    const base64 = fileData.toString("base64");
    fs.unlinkSync(file.path); // Remove temp file after conversion
    return base64;
}

// CREATE - Create a new Blog
exports.createBlog = async (req, res) => {
    try {
        // Ensure req.body exists
        const { title, authorName, description } = req.body;

        // Check if file exists
        if (!title || !authorName || !description || !req.file) {
            return res.status(status.BadRequest).json({
                message: "All fields (title, authorName, description) and image file are required"
            });
        }

        // Convert uploaded file to base64
        const imageBase64 = fileToBase64(req.file);

        // Create new blog
        const blog = new Blog({
            title,
            image: imageBase64,
            authorName,
            description
        });

        await blog.save();

        res.status(status.OK).json({
            message: messages.BLOG_CREATED_SUCCESSFULLY,
            blog
        });
    } catch (err) {
        console.error("Create Blog Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};


// READ - Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.status(status.OK).json({
            message: messages.BLOGS_FETCHED_SUCCESSFULLY,
            count: blogs.length,
            blogs
        });
    } catch (err) {
        console.error("Get All Blogs Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// READ - Get single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(status.NotFound).json({ message: messages.BLOG_NOT_FOUND });
        }

        res.status(status.OK).json({
            message: messages.BLOG_FETCHED_SUCCESSFULLY,
            blog
        });
    } catch (err) {
        console.error("Get Blog By ID Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// UPDATE - Update blog by ID
exports.updateBlog = async (req, res) => {
    try {
        const { title, authorName, description } = req.body;

        let updateData = { title, authorName, description };

        if (req.file) {
            updateData.image = fileToBase64(req.file);
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(status.NotFound).json({ message: messages.BLOG_NOT_FOUND });
        }

        res.status(status.OK).json({
            message: messages.BLOG_UPDATED_SUCCESSFULLY,
            blog
        });
    } catch (err) {
        console.error("Update Blog Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};

// DELETE - Delete blog by ID
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(status.NotFound).json({ message: messages.BLOG_NOT_FOUND });
        }

        res.status(status.OK).json({
            message: messages.BLOG_DELETED_SUCCESSFULLY
        });
    } catch (err) {
        console.error("Delete Blog Error:", err);
        res.status(status.InternalServerError).json({
            message: "Server error",
            error: err.message
        });
    }
};
