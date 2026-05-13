const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books/references
router.get('/', async (req, res) => {
  try {
    const { topic, type, search } = req.query;
    let filter = {};
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET featured books
router.get('/featured', async (req, res) => {
  try {
    const books = await Book.find({ featured: true }).limit(6);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
