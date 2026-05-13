const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// GET all videos
router.get('/', async (req, res) => {
  try {
    const { topic, level, search } = req.query;
    let filter = {};
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    if (level) filter.level = level;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET featured videos
router.get('/featured', async (req, res) => {
  try {
    const videos = await Video.find({ featured: true }).limit(6);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single video
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
