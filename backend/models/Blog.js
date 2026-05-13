const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true }, // full markdown or HTML content
    coverImage: { type: String },
    author: { type: String, required: true, default: 'Sam' },
    topic: { type: String, required: true },
    tags: [{ type: String }],
    readTime: { type: String }, // e.g. "5 min read"
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
