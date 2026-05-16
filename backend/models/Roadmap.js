const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  resources: [{ label: String, url: String }],
  completed: { type: Boolean, default: false },
});

const roadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    topic: { type: String, required: true }, // e.g. "Frontend", "Backend", "DevOps"
    icon: { type: String }, // emoji or icon name
    color: { type: String, default: '#6c63ff' },
    estimatedTime: { type: String }, // e.g. "3 months"
    steps: [stepSchema],
    htmlContent: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
