import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Mock Data for Fallback
const mockRoadmaps = [
  {
    _id: '1',
    title: 'Master Full Stack Web Development',
    description: 'The ultimate path from computer basics to building high-performance full-stack applications.',
    topic: 'Full Stack',
    icon: '🏆',
    color: '#6366f1',
    estimatedTime: '8-12 months',
    featured: true,
    steps: [
      { order: 1, title: 'Computer & Coding Fundamental', description: 'Binary, OS basics, terminal, memory management, and how the internet works.' },
      { order: 2, title: 'HTML & CSS', description: 'Semantic markup, styling fundamentals, Flexbox, Grid, and responsive layouts.' },
      { order: 3, title: 'Tailwind CSS & Bootstrap', description: 'Modern utility-first CSS and classic component frameworks for rapid UI building.' },
      { order: 4, title: 'JavaScript Beginner', description: 'Variables, data types, functions, loops, and basic DOM manipulation.' },
      { order: 5, title: 'JavaScript Advanced', description: 'Closures, Promises, Async/Await, ES6+, prototypes, and architectural patterns.' },
      { order: 6, title: 'React Js', description: 'Components, hooks, state, React Router, and the modern React ecosystem.' },
      { order: 7, title: 'Next Js', description: 'Server-side rendering, static site generation, API routes, and App Router.' },
      { order: 8, title: 'Node js', description: 'Server-side JS runtime, event loop, file system, and npm package management.' },
      { order: 9, title: 'Express Js', description: 'Building RESTful APIs, middleware, routing, and server-side logic.' },
      { order: 10, title: 'MySQL and SQL', description: 'Relational database design, SQL queries, joins, and database normalization.' },
      { order: 11, title: 'MongoDB', description: 'NoSQL document databases, Mongoose, aggregation, and horizontal scaling.' },
    ],
  },
];

const mockVideos = [
  { _id: 'v1', title: 'JavaScript Full Course', duration: '3:26', topic: 'JavaScript', featured: true, youtubeId: 'W6NZfCO5SIk' },
  { _id: 'v2', title: 'React JS Masterclass', duration: '9:00', topic: 'React', featured: true, youtubeId: 'f55qeKGgB_M' },
];

const mockBooks = [
  { _id: 'b1', title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', featured: true, free: true, topic: 'JavaScript' },
];

const mockBlogs = [
  { _id: 'bl1', title: 'JS Tips 2024', slug: 'js-tips', excerpt: 'Modern JS tips...', featured: true, author: 'Sam' },
];

// Helper to wrap API calls with mock fallback
const withFallback = async (apiCall, fallbackData) => {
  try {
    const response = await apiCall();
    return response;
  } catch (err) {
    console.warn('API Error, using mock data:', err.message);
    return { data: fallbackData };
  }
};

// Videos
export const getVideos = (params) => withFallback(() => API.get('videos', { params }), mockVideos);
export const getFeaturedVideos = () => withFallback(() => API.get('videos/featured'), mockVideos);
export const getVideo = (id) => withFallback(() => API.get(`videos/${id}`), mockVideos[0]);

// Books
export const getBooks = (params) => withFallback(() => API.get('books', { params }), mockBooks);
export const getFeaturedBooks = () => withFallback(() => API.get('books/featured'), mockBooks);
export const getBook = (id) => withFallback(() => API.get(`books/${id}`), mockBooks[0]);

// Roadmaps
export const getRoadmaps = (params) => withFallback(() => API.get('roadmaps', { params }), mockRoadmaps);
export const getRoadmap = (id) => withFallback(() => API.get(`roadmaps/${id}`), mockRoadmaps[0]);

// Blogs
export const getBlogs = (params) => withFallback(() => API.get('blogs', { params }), mockBlogs);
export const getFeaturedBlogs = () => withFallback(() => API.get('blogs/featured'), mockBlogs);
export const getBlog = (slug) => withFallback(() => API.get(`blogs/${slug}`), mockBlogs[0]);

export default API;
