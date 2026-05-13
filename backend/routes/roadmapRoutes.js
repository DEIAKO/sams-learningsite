const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

// GET all roadmaps
router.get('/', async (req, res) => {
  try {
    const { topic } = req.query;
    let filter = {};
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    const roadmaps = await Roadmap.find(filter).sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single roadmap
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
