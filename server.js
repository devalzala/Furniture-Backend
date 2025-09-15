const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello, Express with CORS & dotenv!");
});
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/products", require("./routes/productsRoute"));
app.use("/api/contact", require("./routes/contactRoute"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoute"));
app.use("/api/address", require("./routes/addressRoute"));
app.use("/api/blogs", require("./routes/blogRoute"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/sub-categories", require("./routes/subCategoryRoutes"));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});