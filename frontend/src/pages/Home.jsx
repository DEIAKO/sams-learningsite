import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedVideos, getFeaturedBooks, getFeaturedBlogs, getRoadmaps } from '../api';
import { VideoCard, BookCard, BlogCard } from '../components/ContentCard';
import '../components/Footer.css';
import './Home.css';
import samuelProfile from '../assets/samuel_profile.png';

const stats = [
  { value: '50+', label: 'Tutorial Videos', icon: '📹' },
  { value: '30+', label: 'Books & Refs', icon: '📚' },
  { value: '10+', label: 'Roadmaps', icon: '🗺️' },
  { value: '20+', label: 'Blog Posts', icon: '✍️' },
];

const topics = [
  { name: 'JavaScript', icon: '🟨', color: '#f7df1e' },
  { name: 'React js', icon: '⚛️', color: '#61dafb' },
  { name: 'Next Js', icon: '⚫', color: '#000000' },
  { name: 'Java', icon: '☕', color: '#f8981d' },
  { name: 'React Native', icon: '📱', color: '#61dafb' },
  { name: 'WordPress', icon: '🌐', color: '#21759b' },
  { name: 'PHP', icon: '🐘', color: '#777bb4' },
  { name: 'Cloud computing', icon: '☁️', color: '#FF9900' },
  { name: 'others', icon: '📁', color: '#808080' },
];

export default function Home() {
  const [videos, setVideos]   = useState([]);
  const [books, setBooks]     = useState([]);
  const [blogs, setBlogs]     = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);

  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    getFeaturedVideos().then(r => setVideos(r.data)).catch(() => {});
    getFeaturedBooks().then(r => setBooks(r.data)).catch(() => {});
    getFeaturedBlogs().then(r => setBlogs(r.data)).catch(() => {});
    getRoadmaps().then(r => setRoadmaps(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const current = scrollRef.current;
    if (current) {
      current.addEventListener('scroll', handleScroll);
      // Wait for layout to settle, then verify scrolling bounds
      handleScroll();
      const timeoutId = setTimeout(handleScroll, 150);
      window.addEventListener('resize', handleScroll);

      return () => {
        current.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
        clearTimeout(timeoutId);
      };
    }
  }, [videos, books, blogs, roadmaps]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-orb orb-3" />
        </div>
        <div className="container hero-content">
          {/* <div className="hero-badge animate-fade-in">
            <span>🚀</span> Your Developer Learning Hub
          </div> */}
          <h1 className="hero-title animate-fade-in-up">
            Learn to Code,<br/> follow the roadmap<br />
            <span className="gradient-text">Your success is our priority.</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-up">
            + web and software developer တစ်ယောက်ဖြစ်ဖို့ လိုအပ်တဲ့ အရာတွေ အကုန်လုံး ဒီမှာစုစည်းထားပါတယ် အခုဘဲ အခမဲ့ လေ့လာနိုင်ပါပြီ...
          </p>
          <div className="hero-cta animate-fade-in-up">
            <Link to="/videos" className="btn btn-primary">▶ Start Learning</Link>
            <Link to="/roadmap" className="btn btn-outline">View Roadmaps →</Link>
          </div>
          <div className="hero-stats">
            {stats.map(s => (
              <div key={s.label} className="stat-item">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section topics-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by <span className="gradient-text">Topic</span></h2>
            <p>Pick a technology and dive straight into curated content</p>
          </div>
          <div className={`topics-scroll-wrapper ${showLeftArrow ? 'has-left-fade' : ''} ${showRightArrow ? 'has-right-fade' : ''}`}>
            {showLeftArrow && (
              <button 
                className="scroll-btn scroll-btn-left" 
                onClick={() => scroll('left')} 
                aria-label="Scroll left"
              >
                ‹
              </button>
            )}
            
            <div className="topics-grid" ref={scrollRef}>
              {topics.map(t => (
                <Link
                  key={t.name}
                  to={`/videos?topic=${t.name}`}
                  className="topic-card"
                  style={{ '--topic-color': t.color }}
                >
                  <span className="topic-icon">{t.icon}</span>
                  <span className="topic-name">{t.name}</span>
                </Link>
              ))}
            </div>

            {showRightArrow && (
              <button 
                className="scroll-btn scroll-btn-right" 
                onClick={() => scroll('right')} 
                aria-label="Scroll right"
              >
                ›
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      {videos.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Featured <span className="gradient-text">Tutorials</span></h2>
              <p>Hand-picked video courses to accelerate your learning</p>
            </div>
            <div className="grid-3">
              {videos.slice(0, 3).map(v => <VideoCard key={v._id} video={v} />)}
            </div>
            <div className="section-cta">
              <Link to="/videos" className="btn btn-outline">View All Tutorials →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Books */}
      {books.length > 0 && (
        <section className="section alt-section">
          <div className="container">
            <div className="section-header">
              <h2>Books & <span className="gradient-text">References</span></h2>
              <p>Essential reading material and documentation for developers</p>
            </div>
            <div className="grid-3">
              {books.slice(0, 3).map(b => <BookCard key={b._id} book={b} />)}
            </div>
            <div className="section-cta">
              <Link to="/books" className="btn btn-outline">Browse Library →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Roadmaps */}
      {roadmaps.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2>Learning <span className="gradient-text">Roadmaps</span></h2>
              <p>Step-by-step guides to master any technology path</p>
            </div>
            <div className="roadmap-cards">
              {roadmaps.map(r => (
                <Link to={`/roadmap`} key={r._id} className="roadmap-preview-card" style={{ '--rm-color': r.color }}>
                  <span className="rm-icon">{r.icon}</span>
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.estimatedTime && `⏱ ${r.estimatedTime}`} · {r.steps?.length} steps</p>
                  </div>
                  <span className="rm-arrow">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Blogs */}
      {blogs.length > 0 && (
        <section className="section alt-section">
          <div className="container">
            <div className="section-header">
              <h2>Latest <span className="gradient-text">Blog Posts</span></h2>
              <p>Tips, tutorials, and insights from the dev community</p>
            </div>
            <div className="grid-3">
              {blogs.map(b => <BlogCard key={b._id} blog={b} />)}
            </div>
            <div className="section-cta">
              <Link to="/blog" className="btn btn-outline">Read All Posts →</Link>
            </div>
          </div>
        </section>
      )}

      {/* About the Founder */}
      <section className="section instructor-section">
        <div className="container">
          <div className="instructor-card animate-fade-in-up">
            <div className="instructor-image">
              <img src={samuelProfile} alt="Samuel Htamu" />
            </div>
            <div className="instructor-info">
              <span className="badge badge-accent">FOUNDER & INSTRUCTOR</span>
              <h2>Samuel Htamu</h2>
              <p className="instructor-title">[ JavaScript Software Engineer ]</p>
              <p className="instructor-bio">
                Passionate about building scalable web applications and helping others master the craft of software engineering. 
                With expertise in the MERN stack, I'm dedicated to providing high-quality, practical coding education.
              </p>
              <div className="instructor-socials">
                <a href="https://github.com/DEIAKO" target="_blank" rel="noreferrer" className="btn btn-outline">
                  <span className="social-icon">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/samuel-tvmu/" target="_blank" rel="noreferrer" className="btn btn-outline">
                  <span className="social-icon">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to start your coding journey?</h2>
            <p>Join thousands of developers learning and growing every day.</p>
            <Link to="/roadmap" className="btn btn-primary">Get Your Roadmap 🚀</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
