# Sam's Learning Site 🚀

A modern, full-stack MERN learning platform designed to help developers level up their skills through curated roadmaps, videos, books, and blog posts.

## ✨ Features

- **Premium UI/UX**: Textured motion background with animated blobs and glassmorphism.
- **Dark Mode**: Fully optimized dark theme for a focused learning experience.
- **Dynamic Content**: Managed via MongoDB Atlas with easy seeding for new content.
- **MERN Stack**: Built with MongoDB, Express, React, and Node.js.
- **Vite Powered**: Ultra-fast development and build times with Vite.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Vanilla CSS (with modern variables).
- **Backend**: Node.js, Express.
- **Database**: MongoDB Atlas (Mongoose ODM).
- **Version Control**: Git & GitHub.

## 🚀 Getting Started

### 1. Prerequisites
- Node.js installed.
- MongoDB Atlas account (or local MongoDB).

### 2. Clone the Repository
```bash
git clone https://github.com/DEIAKO/sams-learningsite.git
cd sams-learningsite
```

### 3. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
```
Seed the database:
```bash
node seed.js
```
Start the server:
```bash
npm run dev
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

## 🗺️ Project Structure

```text
├── backend/
│   ├── config/         # Database configuration
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware (Error handling, etc.)
│   ├── seed.js         # Initial data seeding script
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route pages (Home, Blog, Roadmap, etc.)
│   │   ├── api/        # Backend API integration
│   │   └── App.jsx     # Main application & routing
└── README.md
```

## 📝 License
This project is licensed under the MIT License.