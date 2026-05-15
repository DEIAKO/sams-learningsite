import { useEffect, useState } from 'react';
import { getBlogs } from '../api';
import { BlogCard } from '../components/ContentCard';
import './Page.css';

const topics = ['All', 'JavaScript', 'Next Js', 'Java', 'React Native', 'others'];

export default function Blog() {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [activeTopic, setActiveTopic] = useState('All');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeTopic !== 'All') params.topic = activeTopic;
    if (search) params.search = search;
    getBlogs(params)
      .then(r => setBlogs(r.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [activeTopic, search]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="page-header-badge">✍️ Blog</div>
          <h1>Developer <span className="gradient-text">Blog</span></h1>
          <p>Tips, tutorials, and insights to sharpen your developer skills</p>
          <div className="search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search blog posts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="page-filters">
          <div>
            <p className="filter-label">Topic</p>
            <div className="filter-tabs">
              {topics.map(t => (
                <button key={t} className={`filter-tab ${activeTopic === t ? 'active' : ''}`} onClick={() => setActiveTopic(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : blogs.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">📭</div>
            <p>No blog posts found. Try a different filter.</p>
          </div>
        ) : (
          <>
            <p className="results-count">{blogs.length} post{blogs.length !== 1 ? 's' : ''} found</p>
            <div className="grid-3">
              {blogs.map(b => <BlogCard key={b._id} blog={b} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
