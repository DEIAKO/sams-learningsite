const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String }, // URL to cover image
    link: { type: String }, // external link to book/resource
    type: { type: String, enum: ['Book', 'Reference', 'Documentation', 'Cheatsheet'], default: 'Book' },
    topic: { type: String, required: true },
    tags: [{ type: String }],
    free: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
