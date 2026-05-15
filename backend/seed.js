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
    topic: 'React js',
    tags: ['React', 'Frontend', 'JavaScript'],
    level: 'Intermediate',
    featured: true,
  },
  {
    title: 'Node.js and Express.js Full Course',
    description: 'Build REST APIs with Node.js and Express. Covers middleware, routing, MongoDB integration and authentication.',
    youtubeId: 'Oe421EPjeBE',
    duration: '8:16:00',
    topic: 'JavaScript',
    tags: ['Node.js', 'Express', 'Backend', 'API'],
    level: 'Intermediate',
    featured: true,
  },
  {
    title: 'MongoDB Crash Course',
    description: 'Get up and running with MongoDB — collections, CRUD operations, aggregation, and Mongoose ODM.',
    youtubeId: '-bt_y4Loofg',
    duration: '1:11:00',
    topic: 'others',
    tags: ['MongoDB', 'Database', 'NoSQL'],
    level: 'Beginner',
    featured: false,
  },
  {
    title: 'CSS Full Course — Flexbox, Grid & More',
    description: 'Master CSS from the basics to advanced layout techniques including Flexbox and CSS Grid.',
    youtubeId: 'OXGznpKZ_sA',
    duration: '11:00:00',
    topic: 'others',
    tags: ['CSS', 'Frontend', 'Design'],
    level: 'Beginner',
    featured: false,
  },
  {
    title: 'TypeScript Full Course for Beginners',
    description: 'Learn TypeScript from scratch — types, interfaces, generics, and integrating with React.',
    youtubeId: 'BwuLxPH8IDs',
    duration: '3:00:00',
    topic: 'others',
    tags: ['TypeScript', 'JavaScript', 'Advanced'],
    level: 'Intermediate',
    featured: false,
  },
  {
    title: 'Java Full Course for Beginners 2024',
    description: 'Learn the Java programming language in this complete course. Covers all core concepts from basics to advanced.',
    youtubeId: 'xk4_1adKOAk',
    duration: '12:00:00',
    topic: 'Java',
    tags: ['Java', 'Programming', 'Backend'],
    level: 'Beginner',
    featured: true,
  },
  {
    title: 'Java OOP — Object Oriented Programming',
    description: 'Master the four pillars of OOP in Java with real-world examples and best practices.',
    youtubeId: 'pTB0EiLXUC8',
    duration: '1:30:00',
    topic: 'Java',
    tags: ['Java', 'OOP', 'Software Design'],
    level: 'Intermediate',
    featured: true,
  },
  {
    title: 'Data Structures and Algorithms in Java',
    description: 'Comprehensive guide to DSA using Java. Includes arrays, linked lists, trees, and algorithm analysis.',
    youtubeId: '2ZLl8GAk1Xg',
    duration: '7:00:00',
    topic: 'others',
    tags: ['Java', 'DSA', 'Computer Science'],
    level: 'Intermediate',
    featured: true,
  },
  {
    title: 'System Design Interview Fundamentals',
    description: 'Learn the core concepts of system design, integration, and architecture for scalable applications.',
    youtubeId: 'm8ICP_MCcE0',
    duration: '1:00:00',
    topic: 'others',
    tags: ['System Design', 'Architecture', 'Backend'],
    level: 'Advanced',
    featured: true,
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
    topic: 'others',
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
    topic: 'others',
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
    topic: 'others',
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
    topic: 'others',
    tags: ['CSS', 'Flexbox', 'Layout'],
    free: true,
    featured: false,
  },
];

const roadmaps = [
  {
    title: 'Frontend Developer Roadmap',
    description: 'A complete step-by-step guide to becoming a professional frontend web developer in 2024.',
    topic: 'React js',
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
    topic: 'JavaScript',
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
    topic: 'JavaScript',
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
  {
    title: 'Java Developer Roadmap',
    description: 'Step-by-step path to becoming a Java professional, from syntax to enterprise frameworks.',
    topic: 'Java',
    icon: '☕',
    color: '#f89820',
    estimatedTime: '3-4 months',
    featured: true,
    steps: [
      { order: 1, title: 'Java Syntax & Basics', description: 'Variables, data types, control flow, and basic class structure.' },
      { order: 2, title: 'Object-Oriented Java', description: 'Classes, objects, inheritance, polymorphism, and interfaces.' },
      { order: 3, title: 'Collections Framework', description: 'Lists, Sets, Maps, and common algorithms in the Java API.' },
      { order: 4, title: 'Exception Handling & IO', description: 'Try-catch blocks, custom exceptions, and file handling (NIO).' },
      { order: 5, title: 'Multithreading & Concurrency', description: 'Threads, synchronization, and the Executor framework.' },
    ],
  },
  {
    title: 'Java OOP & Design Patterns',
    description: 'Deep dive into object-oriented design principles and common architectural patterns in Java.',
    topic: 'Java',
    icon: '🧱',
    color: '#5382a1',
    estimatedTime: '2 months',
    featured: false,
    steps: [
      { order: 1, title: 'Advanced OOP Concepts', description: 'Composition vs Inheritance, Abstract classes vs Interfaces.' },
      { order: 2, title: 'SOLID Principles', description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.' },
      { order: 3, title: 'Creational Patterns', description: 'Singleton, Factory, Builder, and Prototype patterns.' },
      { order: 4, title: 'Structural Patterns', description: 'Adapter, Decorator, Proxy, and Composite patterns.' },
      { order: 5, title: 'Behavioral Patterns', description: 'Observer, Strategy, State, and Command patterns.' },
    ],
  },
  {
    title: 'Mastering DSA with Java',
    description: 'Prepare for technical interviews by mastering data structures and algorithms using Java.',
    topic: 'Java',
    icon: '🧬',
    color: '#d946ef',
    estimatedTime: '4-5 months',
    featured: true,
    steps: [
      { order: 1, title: 'Complexity Analysis', description: 'Understanding Big O, Big Omega, and Big Theta notations.' },
      { order: 2, title: 'Sorting & Searching', description: 'Implementation of Merge Sort, Quick Sort, and Binary Search.' },
      { order: 3, title: 'Linear Data Structures', description: 'Custom implementations of Linked Lists, Stacks, and Queues.' },
      { order: 4, title: 'Trees & Graphs', description: 'BST, Heaps, Graph traversals (BFS/DFS), and shortest path algorithms.' },
      { order: 5, title: 'Dynamic Programming', description: 'Memoization, tabulation, and solving classic DP problems.' },
    ],
  },
  {
    title: 'System Integration & Architecture',
    description: 'Learn to design and integrate complex software systems at scale.',
    topic: 'others',
    icon: '🏗️',
    color: '#10b981',
    estimatedTime: '6 months',
    featured: true,
    steps: [
      { order: 1, title: 'Architecture Styles', description: 'Monolithic, SOA, Microservices, and Serverless architectures.' },
      { order: 2, title: 'Integration Patterns', description: 'Point-to-Point, Pub/Sub, ESB, and API Management.' },
      { order: 3, title: 'Messaging & Events', description: 'Event-driven design using Kafka, RabbitMQ, and Cloud Pub/Sub.' },
      { order: 4, title: 'Scalability & Reliability', description: 'Load balancing, replication, sharding, and circuit breakers.' },
      { order: 5, title: 'Security & Governance', description: 'OAuth2/OIDC, mTLS, API Gateways, and monitoring/logging.' },
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
    topic: 'JavaScript',
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
    topic: 'React js',
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
    topic: 'others',
    tags: ['MongoDB', 'Database', 'Backend'],
    readTime: '7 min read',
    featured: false,
    published: true,
  },
  {
    title: 'Web Rendering ဆိုတာဘာလဲ? SSR, CSR နဲ့ SPA အကြောင်း သိကောင်းစရာ',
    slug: 'understanding-ssr-csr-spa-burmese',
    excerpt: 'Modern Web Development မှာ အသုံးများတဲ့ Rendering types တွေဖြစ်တဲ့ SSR, CSR နဲ့ SPA တို့ရဲ့ ကွာခြားချက်တွေကို မြန်မာလို လွယ်လွယ်ကူကူ ရှင်းပြပေးထားပါတယ်။',
    content: `
# Web Rendering ဆိုတာဘာလဲ? SSR, CSR နဲ့ SPA အကြောင်း သိကောင်းစရာ

Modern Web Apps တွေ တည်ဆောက်တဲ့အခါ Web Rendering types တွေကို သိထားဖို့ အင်မတန် အရေးကြီးပါတယ်။ အဓိက အသုံးများတဲ့ အမျိုးအစား (၃) ခုအကြောင်းကို ရှင်းပြပေးပါမယ်။

## 1. CSR (Client-Side Rendering)
CSR ကတော့ အခုခေတ် React, Vue တို့မှာ အသုံးအများဆုံးပါ။
- **ဘယ်လိုအလုပ်လုပ်သလဲ:** Browser ကနေ Server ဆီက HTML အလွတ်တစ်ခုနဲ့ JavaScript file တွေကို အရင်ယူပါတယ်။ ပြီးမှ Browser ထဲမှာတင် JavaScript ကနေ HTML content တွေကို ဆွဲထုတ် (Render) တာပါ။
- **အားသာချက်:** Page တစ်ခုနဲ့တစ်ခု ကူးတဲ့အခါ အရမ်းမြန်ပါတယ်။ Server load သက်သာပါတယ်။
- **အားနည်းချက်:** ပထမဆုံးအကြိမ် Load လုပ်တဲ့အခါ ကြာတတ်ပါတယ်။ SEO အတွက် အားနည်းချက်ရှိပါတယ်။

## 2. SSR (Server-Side Rendering)
- **ဘယ်လိုအလုပ်လုပ်သလဲ:** User က Request လုပ်လိုက်တိုင်း Server ကနေ HTML တစ်ခုလုံးကို အပြီးအစီး Render လုပ်ပြီး Browser ဆီ ပို့ပေးတာပါ။
- **အားသာချက်:** SEO အတွက် အရမ်းကောင်းပါတယ်။ ပထမဆုံး Load လုပ်တဲ့အချိန်မှာ Content တွေကို ချက်ချင်း မြင်ရပါတယ်။
- **အားနည်းချက်:** Server load များပါတယ်။ Page တစ်ခုချင်းစီအတွက် Server က အလုပ်လုပ်ပေးရပါတယ်။

## 3. SPA (Single Page Application)
SPA ဆိုတာကတော့ Architecture တစ်ခုပါ။
- **ဘယ်လိုအလုပ်လုပ်သလဲ:** Website တစ်ခုလုံးမှာ HTML file တစ်ခုတည်းပဲ ရှိတာပါ။ User က တခြား Page တွေကို သွားတဲ့အခါ Browser က အသစ်ပြန်မတောင်းတော့ဘဲ JavaScript ကနေ လိုအပ်တဲ့ data ကိုပဲယူပြီး Content ကို ပြောင်းလဲပေးတာပါ။
- **ဥပမာ:** Facebook, Gmail တို့ဟာ SPA တွေပါ။

အနှစ်ချုပ်ရရင်တော့ သင့်ရဲ့ Project က SEO ကို ဦးစားပေးတယ်ဆိုရင် SSR ကို သုံးသင့်ပြီး၊ User Experience နဲ့ မြန်ဆန်မှုကို ဦးစားပေးတယ်ဆိုရင်တော့ CSR/SPA ကို သုံးသင့်ပါတယ်။
    `,
    author: 'Sam',
    topic: 'others',
    tags: ['SSR', 'CSR', 'SPA', 'Web Dev', 'Burmese'],
    readTime: '5 min read',
    featured: true,
    published: true,
  },
  {
    title: '၂၀၂၆ ခုနှစ် Web developer များအတွက် လိုအပ်သော SEO ကျွမ်းကျင်မှုများ',
    slug: 'seo-skills-for-web-developers-2026',
    excerpt: '၂၀၂၆ ခုနှစ်မှာ အလုပ်ရှင်တွေက Code ကို သန့်ရှင်းမြန်ဆန်ရုံတင်မကဘဲ လူသားရော AI စနစ်ပါ နားလည်နိုင်အောင် ရေးသားနိုင်တဲ့ Developer တွေကို လိုချင်နေကြတာ ဖြစ်ပါတယ်။',
    content: `
# ၂၀၂၆ ခုနှစ် Web developer များအတွက် လိုအပ်သော SEO ကျွမ်းကျင်မှုများ

SEO ဆိုတာ အခုအခါမှာ Marketing သီးသန့်မဟုတ်တော့ဘဲ Code၊ Content၊ Information Architecture၊ Analytics နဲ့ Governance တို့ ပေါင်းစပ်ထားတဲ့ စနစ်တစ်ခု ဖြစ်လာပါတယ်။ Technical SEO ကျွမ်းကျင်တဲ့သူတစ်ယောက်အနေနဲ့ အောက်ပါတို့ကို လုပ်ဆောင်နိုင်ရပါမယ် -

## ၁။ Technical SEO (နည်းပညာပိုင်းဆိုင်ရာ SEO)
- Search Engine တွေက ကိုယ့်ရဲ့ Page တွေကို ဘာကြောင့် Index မလုပ်တာလဲဆိုတာကို စစ်ဆေးနိုင်ခြင်း။
- Crawl Errors များ၊ Broken Redirects (404s) များနဲ့ Duplicate Content (ထပ်နေတဲ့ အကြောင်းအရာများ) ကို ပြင်ဆင်နိုင်ခြင်း။
- Site Architecture နဲ့ Internal Linking (ဆိုဒ်တွင်း ချိတ်ဆက်မှုများ) ကို အကောင်းဆုံးဖြစ်အောင် လုပ်ဆောင်နိုင်ခြင်း။

## ၂။ Core Web Vitals နှင့် Web Performance
ဆိုဒ်တစ်ခု မြန်မြန်တက်လာဖို့က အသုံးပြုသူ စိတ်ကျေနပ်မှုနဲ့ SEO Ranking အတွက် အလွန်အရေးကြီးပါတယ်။ Website Speed ကို စစ်ဆေးတာ၊ ပုံတွေကို ချုံ့တာ (Image Compression)၊ Caching လုပ်တာနဲ့ Code တွေကို ချုံ့တာ (Minification) တို့ကတစ်ဆင့် Load Time ကို လျှော့ချရပါမယ်။ Google က ဒါတွေကို Ranking သတ်မှတ်ရာမှာ အသုံးပြုတဲ့အတွက် Developer တွေက ဒါကို တာဝန်ယူရမှာ ဖြစ်ပါတယ်။

## ၃။ Structured Data / Schema Markup
အလုပ်ရှင်တွေက SEO၊ Schema နဲ့ AI-enhanced features တွေမှာ ပူးပေါင်းဆောင်ရွက်နိုင်မှုကို မျှော်လင့်ကြပါတယ်။ Schema Markup ဆိုတာ Search Engine တွေ (ဒါမှမဟုတ် AI Assistant တွေ) က ကိုယ့်ရဲ့ အကြောင်းအရာကို ပိုနားလည်အောင် ကူညီပေးတဲ့ Code တွေ ဖြစ်ပါတယ်။ ဒါမှသာ Star Ratings၊ FAQs နဲ့ Product Info တွေကို Search Result မှာ ပေါ်အောင် လုပ်ဆောင်နိုင်မှာပါ။

## ၄။ CMS နှင့် Tag Manager ကျွမ်းကျင်မှု
Content Management Systems (CMS)၊ Tag Managers နဲ့ APIs တွေကို ကျွမ်းကျင်တဲ့သူတွေဟာ Campaign တွေကို ပိုမိုမြန်ဆန် ထိရောက်အောင် လုပ်ဆောင်နိုင်ပါတယ်။ WordPress၊ Shopify ဒါမှမဟုတ် Headless CMS တွေအပြင် Google Tag Manager လိုမျိုး Tool တွေကို အသုံးပြုတတ်ရပါမယ်။

## ၅။ Google Analytics နှင့် Search Console
Technical SEO Audit တွေ လုပ်ဆောင်နိုင်ဖို့ Google Analytics၊ Google Search Console နဲ့ SEM Tool တွေကို အသေးစိတ် သိရှိဖို့ လိုအပ်ပါတယ်။ ဘာတွေက အလုပ်ဖြစ်နေလဲ၊ ဘာတွေက ပျက်နေလဲနဲ့ Traffic တွေ ဘယ်ကလာသလဲဆိုတာကို ဒီ Tool တွေက ပြောပြပေးမှာပါ။

## ၆။ AI ခေတ်၏ AEO/GEO အသိအမြင်
အသုံးပြုသူတွေက ChatGPT ဒါမှမဟုတ် Google’s AI Overview လိုမျိုး AI Tool တွေဆီက အဖြေတောင်းလာကြတဲ့အတွက် AEO (Answer Engine Optimization) နဲ့ GEO (Generative Engine Optimization) က အရေးကြီးလာပါတယ်။ AI စနစ်တွေက ကိုယ့်ရဲ့ Content ကို နားလည်ပြီး ကိုးကားနိုင်အောင် Structure ကျကျ ရေးသားနိုင်ရပါမယ်။

## ၇။ ဌာနစုံ ပူးပေါင်းဆောင်ရွက်မှု (Cross-functional Collaboration)
အလုပ်ရှင်တွေက Project Roadmaps တွေကို စီမံခန့်ခွဲနိုင်သူ၊ Data တွေကို အနက်ဖွင့်ဆိုနိုင်သူနဲ့ Content Team/Developer တွေနဲ့ ပူးပေါင်းလုပ်ဆောင်နိုင်သူတွေကို လိုချင်ကြပါတယ်။ Classic Search ကနေ AI Assistant တွေဆီ ပြောင်းလဲလာတဲ့ အပြုအမူတွေကို နားလည်ဖို့ လိုပါတယ်။

## ၈။ Accessibility (WCAG Compliance)
SEO နဲ့ ဝဘ်ဆိုက်အားလုံး အသုံးပြုနိုင်မှု (Web Accessibility Standards - WCAG 2.1) တို့က အခုအခါမှာ အလုပ်တစ်ခုရဲ့ လိုအပ်ချက် ဖြစ်လာပါတယ်။ Search Engine တွေက အားလုံးအသုံးပြုလို့ရတဲ့ (Accessible ဖြစ်တဲ့) ဆိုဒ်တွေကို ပိုဦးစားပေးပါတယ်။

📌 **အကျဉ်းချုပ် ဇယား**

| SEO Skill | ရည်ရွယ်ချက် |
| :--- | :--- |
| Technical SEO | Indexing၊ Crawling နှင့် ဆိုဒ်ကျန်းမာရေး |
| Core Web Vitals | Page Speed နှင့် Ranking ရမှတ်များ |
| Schema Markup | Rich Results နှင့် AI မှ ဖတ်ရှုနိုင်မှု |
| CMS / Tag Manager | Content နှင့် Tracking စီမံခန့်ခွဲမှု |
| Analytics Tools | Traffic ခွဲခြမ်းစိတ်ဖြာမှုနှင့် Report ထုတ်ပြန်မှု |
| AEO / GEO | AI Search များတွင် မြင်တွေ့နိုင်မှု |
| Accessibility (WCAG) | လူတိုင်းအသုံးပြုနိုင်သော ဒီဇိုင်းနှင့် SEO Ranking |

**အနှစ်ချုပ်အနေနဲ့** - ၂၀၂၆ ခုနှစ်မှာ အလုပ်ရှင်တွေက Code ကို သန့်ရှင်းမြန်ဆန်ရုံတင်မကဘဲ လူသားရော AI စနစ်ပါ နားလည်နိုင်အောင် ရေးသားနိုင်တဲ့ Developer တွေကို လိုချင်နေကြတာ ဖြစ်ပါတယ်။ SEO ဆိုတာ အခုအခါမှာ Marketer တွေရဲ့ အလုပ်တင်မဟုတ်တော့ဘဲ Developer တွေရဲ့ တာဝန်တစ်ခု ဖြစ်လာပါပြီ။
    `,
    author: 'Sam',
    topic: 'others',
    tags: ['SEO', 'Web Development', '2026', 'Burmese', 'AI'],
    readTime: '6 min read',
    featured: true,
    published: true,
  },
  {
    title: 'DevOps ဆိုတာ ဘာလဲ?',
    slug: 'what-is-devops-burmese',
    excerpt: 'DevOps ဆိုတာ ဆော့ဖ်ဝဲလ် ရေးသားခြင်း (Development) နဲ့ အိုင်တီ လုပ်ငန်းလည်ပတ်ခြင်း (Operations) တို့ကို အလုပ်လုပ်ပုံ အဆင့်ဆင့် (Workflow) တစ်ခုတည်းအဖြစ် ပေါင်းစပ်လိုက်တဲ့ လုပ်ဆောင်ချက် ဖြစ်ပါတယ်။',
    content: `
# DevOps ဆိုတာ ဘာလဲ?

DevOps ဆိုတာ ဆော့ဖ်ဝဲလ် ရေးသားခြင်း (Development) နဲ့ အိုင်တီ လုပ်ငန်းလည်ပတ်ခြင်း (Operations) တို့ကို အလုပ်လုပ်ပုံ အဆင့်ဆင့် (Workflow) တစ်ခုတည်းအဖြစ် ပေါင်းစပ်လိုက်တဲ့ လုပ်ဆောင်ချက် ဖြစ်ပါတယ်။ အရင်တုန်းက Developer တွေက ကုဒ်ရေးပြီး Ops Team ဆီကို လွှဲပေးလိုက်ရုံပဲ ဖြစ်ပေမဲ့၊ DevOps စနစ်မှာတော့ Full-stack Dev တစ်ယောက်အနေနဲ့ ကိုယ်တိုင်ရေးတဲ့ ကုဒ်ကို ရေးသားခြင်း (Write)၊ စမ်းသပ်ခြင်း (Test)၊ တင်ဆက်ခြင်း (Deploy)၊ စောင့်ကြည့်ခြင်း (Monitor) နဲ့ ထိန်းသိမ်းခြင်း (Maintain) တို့ကိုပါ တာဝန်ယူရမှာ ဖြစ်ပါတယ်။

၂၀၂၆ ခုနှစ်မှာ Full-stack Dev တစ်ယောက်အနေနဲ့ DevOps Engineer တစ်ယောက်ဖြစ်စရာ မလိုပေမဲ့ ကိုယ့်ရဲ့ Code စီးဆင်းသွားတဲ့ Pipeline ကိုတော့ အသေအချာ နားလည်ထားဖို့ လိုအပ်ပါတယ်။

## အဆင့် ၇ ဆင့်နှင့် အသုံးပြုသော Tool များ

### ၁။ Plan (စီမံကိန်းချခြင်း)
- **ဘာလဲ:** ကုဒ်မရေးခင် Features တွေ၊ Bugs တွေနဲ့ Sprints တွေကို စနစ်တကျ စီစဉ်ခြင်း။
- **Tools:** Jira, GitHub Issues, Linear, Notion - လက်မှတ် (Tickets) များ ပြုလုပ်ခြင်း၊ တိုးတက်မှုကို ခြေရာခံခြင်းတို့အတွက် သုံးပါတယ်။

### ၂။ Code & Version Control (ကုဒ်ရေးသားခြင်းနှင့် ဗားရှင်းထိန်းချုပ်ခြင်း)
- **ဘာလဲ:** ကုဒ်တွေကို တစ်ယောက်နဲ့တစ်ယောက် မထပ်စေဘဲ ပူးပေါင်းရေးသားခြင်း။
- **Tools:**
  - **Git:** အခြေခံအကျဆုံး ဖြစ်ပါတယ်။ Branching, Merging, Rebasing နဲ့ Pull Requests တွေကို သိထားရပါမယ်။
  - **GitHub / GitLab:** Git Repositories တွေကို သိမ်းဆည်းတဲ့ Platform များ ဖြစ်ပါတယ်။
  - **VS Code:** ESLint နဲ့ Prettier လိုမျိုး Tool တွေသုံးပြီး ကုဒ်ရေးတဲ့နေရာမှာ အသုံးများပါတယ်။

### ၃။ Build (တည်ဆောက်ခြင်း)
- **ဘာလဲ:** ကိုယ့်ရဲ့ App ကို ဘယ်စက်မှာမဆို တသမတ်တည်း အလုပ်လုပ်နိုင်အောင် ထုပ်ပိုးခြင်း။
- **Tools:**
  - **Docker:** မဖြစ်မနေ သိထားသင့်ပါတယ်။ ကိုယ့် App ကို Container တစ်ခုထဲ ထည့်လိုက်တဲ့အတွက် "ကိုယ့်စက်မှာတော့ အလုပ်လုပ်တယ်" ဆိုတဲ့ ပြဿနာမျိုး မရှိတော့ပါဘူး။
  - **npm / yarn:** Node.js ပရောဂျက်တွေအတွက် Package တွေကို စီမံပေးပါတယ်။
  - **Vite / Webpack:** Frontend ကုဒ်တွေကို ထုတ်လုပ်မှု (Production) အတွက် စုစည်းပေးပါတယ်။

### ၄။ Test (အလိုအလျောက် စမ်းသပ်ခြင်း)
- **ဘာလဲ:** ကုဒ်အသစ်တင်တိုင်းမှာ Bugs တွေ ပါမသွားအောင် အလိုအလျောက် စမ်းသပ်ခြင်း။
- **Tools:**
  - **Jest:** Unit နဲ့ Integration Testing အတွက် သုံးပါတယ်။
  - **Cypress / Playwright:** အသုံးပြုသူ တကယ်သုံးနေသလိုမျိုး Browser ပေါ်မှာ စမ်းသပ်တာ ဖြစ်ပါတယ်။

### ၅။ CI/CD (အဆက်မပြတ် ပေါင်းစပ်ခြင်းနှင့် တင်ဆက်ခြင်း)
- **ဘာလဲ:** ကုဒ်တစ်ခု Push လုပ်လိုက်တိုင်း Pipeline ကနေ အလိုအလျောက် စမ်းသပ်၊ တည်ဆောက်ပြီး တင်ဆက်ပေးခြင်း ဖြစ်ပါတယ်။ ဒါဟာ DevOps ရဲ့ နှလုံးသားပါ။
- **Tools:**
  - **GitHub Actions:** Full-stack Dev တွေကြား အသုံးအများဆုံးပါ။ YAML ဖိုင်ရေးပြီး Pipeline တည်ဆောက်ရပါတယ်။
  - **Jenkins:** လုပ်ငန်းကြီးတွေမှာ သုံးတဲ့ အဟောင်းဖြစ်ပေမဲ့ အားကောင်းတဲ့ Tool ဖြစ်ပါတယ်။

### ၆။ Deploy & Cloud Infrastructure (ဖြန့်ဝေခြင်းနှင့် အခြေခံအဆောက်အအုံ)
- **ဘာလဲ:** လူတိုင်းဝင်ကြည့်လို့ရအောင် ကိုယ့် App ကို Server ပေါ်တင်ခြင်း။
- **Tools:**
  - **Vercel / Netlify:** Frontend နဲ့ Next.js အတွက် အလွန်လွယ်ကူပါတယ်။
  - **AWS / GCP / Azure:** နာမည်ကြီး Cloud Provider များ ဖြစ်ပါတယ်။ AWS က အလိုအပ်ဆုံးဖြစ်ပြီး EC2, S3, RDS နဲ့ Lambda တို့ကို သိထားသင့်ပါတယ်။
  - **Kubernetes (K8s):** Docker Container အများကြီးကို အတိုင်းအတာတစ်ခုအထိ စီမံခန့်ခွဲတဲ့နေရာမှာ သုံးပါတယ်။
  - **Terraform:** Infrastructure as Code (IaC) ဖြစ်ပြီး Server တည်ဆောက်ပုံကို ကုဒ်နဲ့ ရေးသားတာ ဖြစ်ပါတယ်။

### ၇။ Monitor (စောင့်ကြည့်ခြင်း)
- **ဘာလဲ:** App တင်ပြီးတဲ့အခါ Error တွေ၊ Performance နဲ့ Downtime တွေကို စောင့်ကြည့်ခြင်း။
- **Tools:**
  - **Sentry:** ဘယ် Code လိုင်းမှာ Error တက်သွားလဲဆိုတာကို Real-time ပြပေးပါတယ်။
  - **Datadog / New Relic:** တစ်ဆိုဒ်လုံးရဲ့ အခြေအနေကို Metrics တွေ၊ Logs တွေနဲ့ စောင့်ကြည့်ပါတယ်။
  - **Grafana + Prometheus:** Open-source monitoring စနစ်ဖြစ်ပါတယ်။

## အပိုဆောင်း- လုံခြုံရေး (Security)
Full-stack Dev တစ်ယောက်အနေနဲ့ အောက်ပါတို့ကိုလည်း လိုအပ်ပါတယ် -
- **Environment variables (.env files):** API keys တွေကို ကုဒ်ထဲမှာ ဘယ်တော့မှ တိုက်ရိုက်မရေးပါနဲ့။
- **GitHub Secrets / AWS Secrets Manager:** လျှို့ဝှက်ကုဒ်တွေကို လုံခြုံစွာ သိမ်းဆည်းဖို့ သုံးပါတယ်။
- **Snyk / Dependabot:** အားနည်းချက်ရှိတဲ့ Package တွေကို အလိုအလျောက် စစ်ဆေးပေးပါတယ်။

## ဘာကို အရင်လေ့လာသင့်သလဲ?
အကယ်၍ သင်ဟာ DevOps ကို အခုမှ စလေ့လာမယ့် Full-stack Dev ဆိုရင် ဒီဦးစားပေးအတိုင်း သွားပါ -
1. Git ကို အပိုင်လေ့လာပါ (Branching, PRs)
2. Docker ကို လေ့လာပါ (App တစ်ခုကို Containerize လုပ်ကြည့်ပါ)
3. GitHub Actions (အခြေခံ CI Pipeline တစ်ခု ရေးကြည့်ပါ)
4. Vercel သို့မဟုတ် Render (ကိုယ့် App ကို အလိုအလျောက် Deploy လုပ်ကြည့်ပါ)
5. Sentry (ကိုယ့် Project မှာ Error monitoring ထည့်ကြည့်ပါ)
6. AWS အခြေခံ (S3, EC2, Lambda တို့ကို သိအောင်လုပ်ပါ)

DevOps ဆိုတာ Checklist တစ်ခုမဟုတ်ဘဲ ခရီးစဉ်တစ်ခု ဖြစ်ပါတယ်။ ပရောဂျက်ငယ်လေးတွေကနေ စတင်ပြီး Tool တွေကို တစ်ခုချင်း အသုံးပြုရင်း လေ့လာသွားပါ။
    `,
    author: 'Sam',
    topic: 'others',
    tags: ['DevOps', 'Web Development', 'CI/CD', 'Burmese', 'Cloud'],
    readTime: '8 min read',
    featured: true,
    published: true,
  },
  {
    title: 'TypeScript Async/Await & Axios — Beginner Guide (မြန်မာဘာသာ)',
    slug: 'typescript-async-await-axios-beginner-guide-burmese',
    excerpt: 'Async/Await နဲ့ Axios ကို တွဲသုံးရင် Real-World App တွေ မှာ API ခေါ်ဆိုမှုများကို သန့်ရှင်းစွာနဲ့ ဘေးကင်းစွာ ရေးနိုင်မည်ဖြစ်သည်။',
    content: `
# TypeScript Async/Await & Axios — Beginner Guide (မြန်မာဘာသာ)

---

## 🧠 အရင်ဆုံး နားလည်ရမည့် အခြေခံ

### Synchronous vs Asynchronous ဆိုတာ ဘာလဲ?

**Synchronous** = တစ်ခုပြီးမှ တစ်ခု (တန်းစီစောင့်သည်)
**Asynchronous** = တစ်ပြိုင်နက် လုပ်နိုင်သည် (မစောင့်ဘဲ ဆက်သွားသည်)

\`\`\`
🏪 Synchronous နမူနာ (ဆိုင်မှာ Order မှာသည်)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
မင်း Order မှာ → ထမင်းချက်သည် → ပြီးမှ ရသည် → မင်း အလုပ်ဆက်လုပ်သည်
(တစ်ခုချင်း စောင့်ရသည်)

⚡ Asynchronous နမူနာ (Online Food Delivery)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
မင်း Order မှာ → Delivery လာဆောင်သည် → 
မင်း စောင့်နေစရာမလို၊ တခြားအလုပ်လုပ်နိုင်သည် → 
ထမင်းရောက်မှ စားသည်
\`\`\`

---

## 📌 Part 1: Promise ဆိုတာ ဘာလဲ?

> Async/Await ကို နားလည်ဖို့ Promise ကို အရင်သိရမည်

**Promise** = "ကတိ" — အလုပ်တစ်ခု ပြီးသွားရင် result ပြန်ပေးမည်ဟု ကတိပြုခြင်း

Promise ၏ အခြေအနေ ၃ မျိုး:
- ⏳ **Pending** — မပြီးသေးဘူး
- ✅ **Fulfilled** — အောင်မြင်ပြီး result ရသည်
- ❌ **Rejected** — မအောင်မြင်ဘူး၊ error ဖြစ်သည်

\`\`\`typescript
// 🎬 Scenario: Pizza မှာသည် (Promise နမူနာ)
// Pizza ဆိုင်ကို ဖုန်းဆက်ပြီး မှာသည်။
// ဆိုင်က "30 မိနစ်အတွင်း ပို့ပေးမည်" ဟု ကတိပြုသည် → ဒါဆို Promise

const orderPizza = new Promise<string>((resolve, reject) => {
  const isAvailable = true; // Pizza ရနိုင်/မရနိုင်

  if (isAvailable) {
    setTimeout(() => {
      resolve("🍕 Pizza ရောက်ပြီ!"); // ✅ ကတိပြည့်သည်
    }, 3000);
  } else {
    reject("😢 Pizza မရနိုင်ဘူး"); // ❌ ကတိမပြည့်ဘူး
  }
});

orderPizza
  .then((message) => console.log(message))   // ✅ ရရင်
  .catch((error) => console.log(error));      // ❌ မရရင်
\`\`\`

---

## 📌 Part 2: Async/Await — Promise ကို လွယ်ကူအောင် ရေးနည်း

> Async/Await က Promise ကိုပဲ သုံးသည်၊ ဒါပေမယ့် code ကို ပိုသပ်ရပ်အောင် ရေးနိုင်သည်

### \`async\` keyword

\`\`\`typescript
// ⚠️ async မပါသော function — normal function
function sayHello(): string {
  return "Hello";
}

// ✅ async ပါသော function — Promise ပြန်သည်
async function sayHello(): Promise<string> {
  return "Hello"; // TypeScript က အလိုအလျောက် Promise ထဲ ထည့်သည်
}
\`\`\`

### \`await\` keyword

\`\`\`typescript
// 🎬 Scenario: Bank မှ ငွေသွင်းသည်
// Bank API ကို ခေါ်ရသည်၊ အဖြေကို စောင့်ရသည်

async function transferMoney() {

  console.log("1️⃣ ငွေလွှဲမည်...");

  // await = "ဒီကောင် ပြီးမှ အောက်ကို ဆက်သွား"
  const result = await sendToBank(5000); // Bank မပြန်မချင်း ဒီမှာ စောင့်

  console.log("2️⃣ Bank response:", result);
  console.log("3️⃣ လွှဲပြီးပြီ!");
}

// await မပါရင် ဘာဖြစ်မလဲ?
function transferMoneyWrong() {
  console.log("1️⃣ ငွေလွှဲမည်...");
  
  const result = sendToBank(5000); // ❌ await မပါ = Promise object ပဲ ရသည်
  // result က "Promise { <pending> }" — ငွေပမာဏ မဟုတ်ဘူး!
  
  console.log("2️⃣ result:", result); // ❌ မှားသည်
}
\`\`\`

---

## 📌 Part 3: Error Handling (try/catch)

> Internet မကောင်းရင်? Server ပိတ်နေရင်? — Error ကို handle လုပ်ရမည်

\`\`\`typescript
// 🎬 Scenario: Facebook Login လုပ်သည်
// Username/Password မှားရင် error ဖြစ်သည်

interface User {
  id: number;
  name: string;
  email: string;
}

async function loginUser(email: string, password: string): Promise<User | null> {
  
  try {
    // ✅ ဒီ block ထဲမှာ code ကြိုးစားသည်
    console.log("🔄 Login လုပ်နေသည်...");
    
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    
    const user = await response.json() as User;
    console.log("✅ Login အောင်မြင်သည်!", user.name);
    return user;

  } catch (error) {
    // ❌ ဒီ block ထဲကို error ဖြစ်မှ ရောက်သည်
    console.error("❌ Login မအောင်မြင်ဘူး:", error);
    return null;
  }
}

// သုံးပုံ
async function main() {
  const user = await loginUser("john@gmail.com", "password123");

  if (user) {
    console.log("Welcome,", user.name);    // ✅ Login ရပြီ
  } else {
    console.log("Login ထပ်ကြိုးစားပါ");  // ❌ မရသေးဘူး
  }
}
\`\`\`

---

## 📌 Part 4: Promise.all — တစ်ပြိုင်နက် လုပ်ခြင်း

> အလုပ် ၂ ခု တပြိုင်နက်လုပ်ရင် ပိုမြန်သည်

\`\`\`typescript
// 🎬 Scenario: Dashboard Page ဖွင့်သည်
// User info + Orders list ကို တစ်ချိန်တည်း ယူချင်သည်

async function loadDashboard(userId: number) {

  console.log("📊 Dashboard Loading...");

  // ❌ Sequential (နှေး) — User ပြီးမှ Orders ယူသည်
  // const user   = await getUser(userId);   // 1 second
  // const orders = await getOrders(userId); // 1 second
  // total = 2 seconds

  // ✅ Parallel (မြန်) — တပြိုင်နက် ယူသည်
  const [user, orders] = await Promise.all([
    getUser(userId),    // ၁ second
    getOrders(userId),  // ၁ second
  ]);
  // total = ၁ second သာ! (နှစ်ဆ မြန်သည်)

  console.log("👤 User:", user.name);
  console.log("📦 Orders:", orders.length, "ခု");
}
\`\`\`

\`\`\`
⏱️ မြင်ယောင်ကြည့်ပါ:

Sequential:  [==User==][==Orders==]  = 2 seconds
             ━━━━━━━━━━━━━━━━━━━━━━

Parallel:    [==User==]              = 1 second
             [==Orders==]
             ━━━━━━━━━━━
\`\`\`

---

## 📌 Part 5: Axios ဆိုတာ ဘာလဲ?

> **Axios** = Internet မှတဆင့် Server နဲ့ ဆက်သွယ်သော Tool

ဘာကြောင့် Axios သုံးသလဲ? \`fetch\` ထက် ဘာကောင်းသလဲ?

\`\`\`
✅ Axios ရဲ့ အားသာချက်များ
━━━━━━━━━━━━━━━━━━━━━━━━
✔ JSON ကို အလိုအလျောက် parse လုပ်သည်
✔ Error ကို အလိုအလျောက် throw လုပ်သည် (404, 500, etc.)
✔ TypeScript generic support ကောင်းသည်
✔ Interceptor (request/response ကို အလယ်မှာ ဖမ်းနိုင်သည်)
✔ Timeout setting ရှိသည်
\`\`\`

### Install လုပ်ပုံ

\`\`\`bash
npm install axios
\`\`\`

---

## 📌 Part 6: Axios Basic — GET, POST, PUT, DELETE

\`\`\`typescript
import axios from "axios";

// Data ၏ shape ကို TypeScript နဲ့ သတ်မှတ်သည်
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

// ─────────────────────────────────────────────
// 🎬 Scenario 1: GET — ကုန်ပစ္စည်းများ ကြည့်သည်
// (Online Shop မှာ product list ထုတ်ကြည့်သည်)
// ─────────────────────────────────────────────
async function getAllProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>("https://api.myshop.com/products");
  
  // axios က response.data ထဲမှာ data ထည့်ပေးသည်
  return response.data;
}

// ─────────────────────────────────────────────
// 🎬 Scenario 2: POST — ကုန်ပစ္စည်းသစ် ထည့်သည်
// (Admin က ကုန်ပစ္စည်းသစ် တင်သည်)
// ─────────────────────────────────────────────
async function addProduct(newProduct: Omit<Product, "id">): Promise<Product> {
  const response = await axios.post<Product>(
    "https://api.myshop.com/products",
    newProduct // ← ဒါကို JSON အဖြစ် Server ကို ပို့သည်
  );
  return response.data; // ← Server က ID နဲ့ ပြန်ပေးသည်
}

// ─────────────────────────────────────────────
// 🎬 Scenario 3: PUT — ကုန်ပစ္စည်း Edit လုပ်သည်
// (Admin က ဈေးနှုန်း ပြင်သည်)
// ─────────────────────────────────────────────
async function updatePrice(id: number, newPrice: number): Promise<Product> {
  const response = await axios.put<Product>(
    \`https://api.myshop.com/products/\${id}\`,
    { price: newPrice }
  );
  return response.data;
}

// ─────────────────────────────────────────────
// 🎬 Scenario 4: DELETE — ကုန်ပစ္စည်း ဖျက်သည်
// (Admin က Stock မရှိတော့သော ကုန်ကို ဖျက်သည်)
// ─────────────────────────────────────────────
async function deleteProduct(id: number): Promise<void> {
  await axios.delete(\`https://api.myshop.com/products/\${id}\`);
  console.log(\`Product \${id} ဖျက်ပြီးပြီ\`);
}

// ─────────────────────────────────────────────
// 🎬 စမ်းကြည့်ပုံ
// ─────────────────────────────────────────────
async function main() {
  // ကုန်ပစ္စည်းအားလုံး ကြည့်သည်
  const products = await getAllProducts();
  console.log("Products:", products);

  // ကုန်ပစ္စည်းသစ် ထည့်သည်
  const newItem = await addProduct({ name: "Laptop", price: 1500000, stock: 10 });
  console.log("New Product ID:", newItem.id);

  // ဈေးပြင်သည်
  await updatePrice(newItem.id, 1400000);
  
  // ဖျက်သည်
  await deleteProduct(newItem.id);
}
\`\`\`

---

## 📌 Part 7: Axios Instance — Best Practice

> ဆိုင်တိုင်းမှာ အဓိကလိပ်စာ (baseURL) ရှိသည်

\`\`\`typescript
// 🎬 Scenario: E-commerce App တစ်ခု တည်ဆောက်သည်
// API URL ကို အချိန်တိုင်း ထပ်ခါတလဲလဲ မရေးချင်ဘူး

import axios from "axios";

// ❌ ညံ့သော နည်း — URL ထပ်ခါတလဲလဲ ရေးရသည်
axios.get("https://api.myshop.com/v1/products");
axios.get("https://api.myshop.com/v1/users");
axios.get("https://api.myshop.com/v1/orders");

// ✅ ကောင်းသော နည်း — Instance တစ်ခု ဆောက်ပြီး ထပ်သုံးသည်
const api = axios.create({
  baseURL: "https://api.myshop.com/v1", // ← Base URL တစ်ကြိမ်ပဲ ရေးရသည်
  timeout: 5000,                         // ← 5 second မတုန့်ပြန်ရင် error
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${localStorage.getItem("token")}\`,
  },
});

// ✅ အခုနောက်ပိုင်း /products, /users, /orders ပဲ ရေးရသည်
api.get("/products");
api.get("/users");
api.get("/orders");
\`\`\`

---

## 📌 Part 8: Interceptors — Request/Response ကို ကြားဖြတ်ဖမ်းနည်း

> Airport ရဲ့ Security Check လိုသဘောပဲ — ဝင်/ထွက် တိုင်း စစ်ဆေးသည်

\`\`\`typescript
// 🎬 Scenario: App အတွင်း API ခေါ်တိုင်း Token ထည့်ချင်သည်
// (တစ်ခုချင်း Headers ထည့်ရင် ပင်ပန်းလွန်းသည်)

// ✈️ REQUEST Interceptor — Server ကိုမပို့ခင် ကြားဖမ်းသည်
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
    console.log("🔑 Token ထည့်ပြီး Request ပို့မည်");
  }
  
  return config; // ← ဒါမပါရင် request ရပ်သွားသည်!
});

// 📬 RESPONSE Interceptor — Client ကိုမပေးခင် ကြားဖမ်းသည်
api.interceptors.response.use(
  (response) => {
    // ✅ 200-299 status — အောင်မြင်သည်
    console.log("✅ Response ရပြီ:", response.status);
    return response;
  },
  (error) => {
    // ❌ Error status — မအောင်မြင်ဘူး
    if (error.response?.status === 401) {
      console.log("🚫 Session ကုန်သွားပြီ၊ Login ပြန်လုပ်ပါ");
      window.location.href = "/login"; // Login Page ကို ပို့သည်
    }
    
    if (error.response?.status === 500) {
      console.log("🔥 Server Error — နည်းပညာဌာနကို အသိပေးပါ");
    }
    
    return Promise.reject(error);
  }
);
\`\`\`

---

## 📌 Part 9: Axios Error Handling

\`\`\`typescript
import axios from "axios";

// 🎬 Scenario: User Profile ကြည့်သည်
// User မရှိရင် 404, Server ပြဿနာရင် 500 ဖြစ်သည်

async function getUserProfile(userId: number) {
  try {
    const response = await api.get(\`/users/\${userId}\`);
    return response.data;

  } catch (error) {
    
    // Axios error ဟုတ်/မဟုတ် စစ်သည်
    if (axios.isAxiosError(error)) {
      
      const status = error.response?.status;
      
      if (status === 404) {
        console.log("😕 User မရှိဘူး");           // Not Found
      } else if (status === 403) {
        console.log("🚫 ဒီ Profile ကြည့်ခွင့် မရှိဘူး");  // Forbidden
      } else if (status === 500) {
        console.log("🔥 Server ပြဿနာ ဖြစ်နေသည်"); // Server Error
      } else if (!error.response) {
        console.log("🌐 Internet မကောင်းဘူး");    // Network Error
      }
      
    } else {
      // Axios မဟုတ်သော error (TypeScript error, etc.)
      console.log("⚠️ မမျှော်လင့်သော Error:", error);
    }
    
    return null;
  }
}
\`\`\`

---

## 📌 Part 10: အားလုံး ပေါင်းစပ်ထားသော Real-World နမူနာ

\`\`\`typescript
// 🎬 Final Scenario: Mini E-Commerce App
// — Product List ကြည့်သည်
// — Cart ထဲ ထည့်သည်
// — Order တင်သည်

import axios from "axios";

interface Product { id: number; name: string; price: number; }
interface CartItem { productId: number; quantity: number; }
interface Order    { id: number; items: CartItem[]; total: number; }

// ① Axios Instance
const api = axios.create({
  baseURL: "https://api.myshop.com",
  timeout: 8000,
});

// ② Token ကို Request တိုင်း အလိုအလျောက် ထည့်သည်
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// ③ Products ယူသည်
async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await api.get<Product[]>("/products");
    return res.data;
  } catch {
    console.error("Products မရနိုင်ဘူး");
    return [];
  }
}

// ④ Order တင်သည်
async function placeOrder(cartItems: CartItem[]): Promise<Order | null> {
  try {
    const res = await api.post<Order>("/orders", { items: cartItems });
    console.log("✅ Order တင်ပြီးပြီ! Order ID:", res.data.id);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      console.error("❌ Stock မလုံလောက်ဘူး");
    }
    return null;
  }
}

// ⑤ Dashboard ဖွင့်သည် — Products နဲ့ User info တပြိုင်နက် ယူသည်
async function loadShopDashboard(userId: number) {
  console.log("🛍️ Shop Loading...");

  const [products, userRes] = await Promise.all([
    fetchProducts(),
    api.get(\`/users/\${userId}\`),
  ]);

  console.log(\`👤 Welcome, \${userRes.data.name}!\`);
  console.log(\`📦 ကုန်ပစ္စည်း \${products.length} မျိုး ရှိသည်\`);

  // Order တင်ကြည့်သည်
  const myCart: CartItem[] = [
    { productId: products[0].id, quantity: 2 },
    { productId: products[1].id, quantity: 1 },
  ];

  await placeOrder(myCart);
}

// Run!
loadShopDashboard(42);
\`\`\`

---

## 🗺️ Summary — အကျဉ်းချုပ်

\`\`\`
📘 Async/Await
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async  → function က Promise ပြန်မည်ဟု ကြေညာသည်
await  → Promise ပြီးသည်အထိ ဒီနေရာမှာ စောင့်သည်
try    → Code ကြိုးစားသည် (အောင်မြင်ရင် ဒီထဲ)
catch  → Error ဖြစ်ရင် ဒီထဲ ရောက်သည်
Promise.all → အမျိုးမျိုး တပြိုင်နက် run သည်

🌐 Axios
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
axios.get()    → Data ယူသည်   (READ)
axios.post()   → Data ထည့်သည် (CREATE)
axios.put()    → Data ပြင်သည် (UPDATE)
axios.delete() → Data ဖျက်သည် (DELETE)
axios.create() → Reusable instance ဆောက်သည်
interceptors   → Request/Response ကို ကြားဖြတ်ဖမ်းသည်
isAxiosError() → Axios error ဟုတ်/မဟုတ် စစ်သည်
\`\`\`

> 💡 **Beginner Tip:** Async/Await နဲ့ Axios ကို တွဲသုံးရင် Real-World App တွေ မှာ API ခေါ်ဆိုမှုများကို သန့်ရှင်းစွာနဲ့ ဘေးကင်းစွာ ရေးနိုင်မည်ဖြစ်သည်။
    `,
    author: 'Sam',
    topic: 'JavaScript',
    tags: ['TypeScript', 'JavaScript', 'Async', 'Axios', 'Burmese'],
    readTime: '12 min read',
    featured: true,
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
