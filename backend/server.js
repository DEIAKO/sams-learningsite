require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
require('dns').setDefaultResultOrder('ipv4first');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const videoRoutes = require('./routes/videoRoutes');
const bookRoutes = require('./routes/bookRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/videos', videoRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/blogs', blogRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: "Sam's Learning Site API is running 🚀" });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
