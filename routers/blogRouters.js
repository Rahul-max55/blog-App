const express = require('express');
const { getAllBlogController, insertBlogController, SingleBlogController, UpdateBlogController, DeleteBlogController } = require('../controllers/blogController');
const router = express.Router();

// GET || Get all blogs
router.get("/all_blogs", getAllBlogController);

// POST || post the data
router.post("/insert_blog", insertBlogController);

// GET || single blog
router.get("/single_blog/:id" , SingleBlogController)

// PUT || update the blog
router.put("/update_blog/:id" , UpdateBlogController)

// DELETE || delete the blog
router.delete("/delete_blog/:id", DeleteBlogController)

module.exports = router;