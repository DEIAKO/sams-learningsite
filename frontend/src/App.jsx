import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background from './components/Background';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Books from './pages/Books';
import Roadmap from './pages/Roadmap';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BuyMeCoffee from './components/BuyMeCoffee';

function App() {
  return (
    <BrowserRouter>
      <Background />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/videos"    element={<Videos />} />
          <Route path="/books"     element={<Books />} />
          <Route path="/roadmap"   element={<Roadmap />} />
          <Route path="/blog"      element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
      <BuyMeCoffee />
    </BrowserRouter>
  );
}

export default App;
