require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
require('dns').setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Video = require('./models/Video');
const Book = require('./models/Book');
const Roadmap = require('./models/Roadmap');
const Blog = require('./models/Blog');

const videos = [
  {
    title: 'JavaScript Full Course for Beginners',
    description: 'Complete JavaScript tutorial covering all fundamentals from variables to async/await. Perfect starting point for web development.',
    youtubeId: 'W6NZfCO5SIk',
    duration: '3:26:42',
    topic: 'JavaScript',
    tags: ['JavaScript', 'Web Dev', 'Beginner'],
    level: 'Beginner',
    featured: true,
  },
  {
    title: 'React JS Full Course 2024',
    description: 'Learn React from scratch — hooks, state management, context API, and building real projects.',
    youtubeId: 'f55qeKGgB_M',
    duration: '9:00:00',
    topic: 'React',
    tags: ['React', 'Frontend', 'JavaScript'],
    level: 'Intermediate',
    featured: true,
  },
  {
    title: 'Node.js and Express.js Full Course',
    description: 'Build REST APIs with Node.js and Express. Covers middleware, routing, MongoDB integration and authentication.',
    youtubeId: 'Oe421EPjeBE',
    duration: '8:16:00',
    topic: 'Node.js',
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    level: 'Intermediate',
    featured: true,
  },
  {
    title: 'MongoDB Crash Course',
    description: 'Get up and running with MongoDB — collections, CRUD operations, aggregation, and Mongoose ODM.',
    youtubeId: '-bt_y4Loofg',
    duration: '1:11:00',
    topic: 'MongoDB',
    tags: ['MongoDB', 'Database', 'NoSQL'],
    level: 'Beginner',
    featured: false,
  },
  {
    title: 'CSS Full Course — Flexbox, Grid & More',
    description: 'Master CSS from the basics to advanced layout techniques including Flexbox and CSS Grid.',
    youtubeId: 'OXGznpKZ_sA',
    duration: '11:00:00',
    topic: 'CSS',
    tags: ['CSS', 'Frontend', 'Design'],
    level: 'Beginner',
    featured: false,
  },
  {
    title: 'TypeScript Full Course for Beginners',
    description: 'Learn TypeScript from scratch — types, interfaces, generics, and integrating with React.',
    youtubeId: 'BwuLxPH8IDs',
    duration: '3:00:00',
    topic: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Advanced'],
    level: 'Intermediate',
    featured: false,
  },
];

const books = [
  {
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    description: 'A modern introduction to programming using JavaScript. Free to read online. Covers JS fundamentals to advanced topics.',
    coverImage: 'https://eloquentjavascript.net/img/cover.jpg',
    link: 'https://eloquentjavascript.net',
    type: 'Book',
    topic: 'JavaScript',
    tags: ['JavaScript', 'Programming'],
    free: true,
    featured: true,
  },
  {
    title: 'You Don\'t Know JS (Book Series)',
    author: 'Kyle Simpson',
    description: 'A series of books diving deep into the core mechanisms of the JavaScript language. Available free on GitHub.',
    coverImage: 'https://github.com/getify/You-Dont-Know-JS/raw/2nd-ed/get-started/images/cover.png',
    link: 'https://github.com/getify/You-Dont-Know-JS',
    type: 'Book',
    topic: 'JavaScript',
    tags: ['JavaScript', 'Advanced'],
    free: true,
    featured: true,
  },
  {
    title: 'MDN Web Docs',
    author: 'Mozilla',
    description: 'The definitive reference for HTML, CSS, and JavaScript. An essential bookmark for every web developer.',
    link: 'https://developer.mozilla.org',
    type: 'Reference',
    topic: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'Reference'],
    free: true,
    featured: true,
  },
  {
    title: 'React Documentation',
    author: 'Meta (Facebook)',
    description: 'The official React documentation — learn React from the team that built it. Includes interactive examples.',
    link: 'https://react.dev',
    type: 'Documentation',
    topic: 'React',
    tags: ['React', 'Frontend'],
    free: true,
    featured: false,
  },
  {
    title: 'Node.js Documentation',
    author: 'OpenJS Foundation',
    description: 'Official Node.js API reference and guides. Essential for understanding the runtime environment and built-in modules.',
    link: 'https://nodejs.org/docs',
    type: 'Documentation',
    topic: 'Node.js',
    tags: ['Node.js', 'Backend'],
    free: true,
    featured: false,
  },
  {
    title: 'CSS Tricks — Complete Flexbox Guide',
    author: 'Chris Coyier',
    description: 'The most comprehensive and up-to-date guide to CSS Flexbox. A must-bookmark reference for frontend developers.',
    link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    type: 'Cheatsheet',
    topic: 'CSS',
    tags: ['CSS', 'Flexbox', 'Layout'],
    free: true,
    featured: false,
  },
];

const roadmaps = [
  {
    title: 'Frontend Developer Roadmap',
    description: 'A complete step-by-step guide to becoming a professional frontend web developer in 2024.',
    topic: 'Frontend',
    icon: '🎨',
    color: '#6c63ff',
    estimatedTime: '4-6 months',
    featured: true,
    steps: [
      { order: 1, title: 'HTML Fundamentals', description: 'Learn semantic HTML5, forms, accessibility, and document structure.', resources: [{ label: 'MDN HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' }] },
      { order: 2, title: 'CSS & Styling', description: 'Master CSS selectors, Flexbox, Grid, animations, and responsive design.', resources: [{ label: 'CSS Tricks', url: 'https://css-tricks.com' }] },
      { order: 3, title: 'JavaScript Basics', description: 'Learn JS fundamentals: variables, functions, loops, DOM manipulation, events.', resources: [{ label: 'Eloquent JavaScript', url: 'https://eloquentjavascript.net' }] },
      { order: 4, title: 'Advanced JavaScript', description: 'Promises, async/await, modules, ES6+ features, and browser APIs.', resources: [{ label: 'YDKJS', url: 'https://github.com/getify/You-Dont-Know-JS' }] },
      { order: 5, title: 'React Framework', description: 'Components, hooks, state management, React Router, and Context API.', resources: [{ label: 'React Docs', url: 'https://react.dev' }] },
      { order: 6, title: 'Version Control (Git)', description: 'Git basics: commits, branches, merging, GitHub workflow.', resources: [{ label: 'Pro Git', url: 'https://git-scm.com/book' }] },
      { order: 7, title: 'Build Tools & Deployment', description: 'Vite, npm scripts, environment variables, and deploying to Netlify/Vercel.', resources: [{ label: 'Vite Docs', url: 'https://vitejs.dev' }] },
    ],
  },
  {
    title: 'Backend Developer Roadmap',
    description: 'Learn server-side development with Node.js, Express, databases, and REST APIs.',
    topic: 'Backend',
    icon: '⚙️',
    color: '#f59e0b',
    estimatedTime: '4-6 months',
    featured: true,
    steps: [
      { order: 1, title: 'JavaScript & Node.js Basics', description: 'Understanding Node.js runtime, modules, npm, and the event loop.', resources: [{ label: 'Node.js Docs', url: 'https://nodejs.org/docs' }] },
      { order: 2, title: 'Express.js Framework', description: 'Build web servers, define routes, use middleware, and handle errors.', resources: [{ label: 'Express Docs', url: 'https://expressjs.com' }] },
      { order: 3, title: 'Databases — MongoDB', description: 'NoSQL fundamentals, CRUD operations, Mongoose ODM, and schema design.', resources: [{ label: 'MongoDB Docs', url: 'https://www.mongodb.com/docs' }] },
      { order: 4, title: 'REST API Design', description: 'RESTful principles, HTTP methods, status codes, and API versioning.', resources: [{ label: 'REST API Tutorial', url: 'https://restapitutorial.com' }] },
      { order: 5, title: 'Authentication & Security', description: 'JWT tokens, bcrypt password hashing, CORS, environment variables.', resources: [{ label: 'JWT.io', url: 'https://jwt.io' }] },
      { order: 6, title: 'Testing & Deployment', description: 'Unit testing with Jest, deploying to Railway/Render, CI/CD basics.', resources: [{ label: 'Jest Docs', url: 'https://jestjs.io' }] },
    ],
  },
  {
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

const blogs = [
  {
    title: '10 JavaScript Tips Every Developer Should Know in 2024',
    slug: 'javascript-tips-2024',
    excerpt: 'Level up your JavaScript skills with these practical tips covering modern ES6+ features, performance tricks, and clean code practices.',
    content: `
# 10 JavaScript Tips Every Developer Should Know in 2024

JavaScript continues to evolve rapidly. Here are 10 tips to write cleaner, faster, and more modern JavaScript.

## 1. Use Optional Chaining (?.)
Instead of deeply nested if-checks, use optional chaining:
\`\`\`js
const city = user?.address?.city ?? 'Unknown';
\`\`\`

## 2. Destructuring Assignment
Extract values cleanly from arrays and objects:
\`\`\`js
const { name, age, role = 'user' } = userObject;
const [first, ...rest] = myArray;
\`\`\`

## 3. Array Methods Over Loops
Prefer \`map\`, \`filter\`, \`reduce\` over traditional for loops for cleaner code.

## 4. Async/Await Over Promises
Use async/await for readable asynchronous code with proper try/catch error handling.

## 5. Use Spread Operator
Merge objects and arrays without mutation:
\`\`\`js
const merged = { ...defaults, ...userSettings };
\`\`\`

These are just a few of the modern patterns that will make your JS code cleaner and more maintainable.
    `,
    author: 'Sam',
    topic: 'JavaScript',
    tags: ['JavaScript', 'Tips', 'ES6'],
    readTime: '5 min read',
    featured: true,
    published: true,
  },
  {
    title: 'Building Your First REST API with Node.js and Express',
    slug: 'first-rest-api-nodejs-express',
    excerpt: 'A step-by-step guide to creating a RESTful API with Node.js, Express, and MongoDB. From zero to a working API in under an hour.',
    content: `
# Building Your First REST API with Node.js and Express

REST APIs are the backbone of modern web apps. In this guide, we'll build one from scratch.

## What is a REST API?
REST (Representational State Transfer) is an architectural style for distributed hypermedia systems. It uses standard HTTP methods: GET, POST, PUT, DELETE.

## Setting Up the Project
\`\`\`bash
mkdir my-api && cd my-api
npm init -y
npm install express mongoose dotenv cors
\`\`\`

## Creating the Server
\`\`\`js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/items', (req, res) => {
  res.json({ items: [] });
});

app.listen(5000, () => console.log('Server running on port 5000'));
\`\`\`

Follow this pattern for all your routes and you'll have a working REST API in no time!
    `,
    author: 'Sam',
    topic: 'Node.js',
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    readTime: '8 min read',
    featured: true,
    published: true,
  },
  {
    title: 'React Hooks Explained: useState, useEffect, and useContext',
    slug: 'react-hooks-explained',
    excerpt: 'Demystifying the three most important React Hooks with real-world examples and best practices.',
    content: `
# React Hooks Explained

Hooks revolutionized how we write React components. Let's dive into the big three.

## useState — Managing State
\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`
useState returns the current state value and a setter function. Always use the setter — never mutate state directly.

## useEffect — Side Effects
\`\`\`jsx
useEffect(() => {
  fetchData();
  return () => cleanup();
}, [dependency]);
\`\`\`
The dependency array controls when the effect runs. Empty array = run once on mount.

## useContext — Global State
\`\`\`jsx
const theme = useContext(ThemeContext);
\`\`\`
useContext lets you consume context values without prop drilling.

Master these three hooks and you'll be able to build almost any React application!
    `,
    author: 'Sam',
    topic: 'React',
    tags: ['React', 'Hooks', 'Frontend'],
    readTime: '6 min read',
    featured: true,
    published: true,
  },
  {
    title: 'MongoDB Schema Design Best Practices',
    slug: 'mongodb-schema-design',
    excerpt: 'Learn how to design efficient MongoDB schemas — when to embed documents vs reference them, and how to model real-world data.',
    content: `
# MongoDB Schema Design Best Practices

Unlike SQL databases, MongoDB gives you flexibility in schema design. Here's how to use it wisely.

## Embed vs Reference
**Embed** when data is frequently read together and one-to-few relationships.
**Reference** when data is shared across documents or one-to-many/many-to-many.

## Use Mongoose for Validation
\`\`\`js
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
});
\`\`\`

## Index Your Query Fields
\`\`\`js
schema.index({ email: 1 });
schema.index({ topic: 1, createdAt: -1 });
\`\`\`

Good schema design is the foundation of a fast MongoDB application.
    `,
    author: 'Sam',
    topic: 'MongoDB',
    tags: ['MongoDB', 'Database', 'Backend'],
    readTime: '7 min read',
    featured: false,
    published: true,
  },
];

const seedDB = async () => {
  await connectDB();
  console.log('🌱 Seeding database...');

  await Video.deleteMany();
  await Book.deleteMany();
  await Roadmap.deleteMany();
  await Blog.deleteMany();

  await Video.insertMany(videos);
  await Book.insertMany(books);
  await Roadmap.insertMany(roadmaps);
  await Blog.insertMany(blogs);

  console.log('✅ Database seeded successfully!');
  console.log(`  📹 ${videos.length} videos`);
  console.log(`  📚 ${books.length} books/references`);
  console.log(`  🗺️  ${roadmaps.length} roadmaps`);
  console.log(`  📝 ${blogs.length} blog posts`);
  process.exit(0);
};

seedDB();
