const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const { topic, search } = req.query;
    let filter = { published: true };
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    if (search) filter.title = { $regex: search, $options: 'i' };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET featured blogs
router.get('/featured', async (req, res) => {
  try {
    const blogs = await Blog.find({ featured: true, published: true }).limit(3);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
