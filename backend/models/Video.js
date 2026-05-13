const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    youtubeId: { type: String, required: true }, // YouTube video ID
    thumbnail: { type: String }, // auto-derived or custom
    duration: { type: String }, // e.g. "12:34"
    topic: { type: String, required: true }, // e.g. "JavaScript", "React"
    tags: [{ type: String }],
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
