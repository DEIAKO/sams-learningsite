import { useEffect, useState } from 'react';
import { getBooks } from '../api';
import { BookCard } from '../components/ContentCard';
import './Page.css';

const topics = ['All', 'JavaScript', 'React js', 'Next Js', 'Java', 'React Native', 'WordPress', 'PHP', 'others'];
const types   = ['All', 'Book', 'Reference', 'Documentation', 'Cheatsheet'];

export default function Books() {
  const [books, setBooks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]  = useState('');
  const [activeTopic, setActiveTopic] = useState('All');
  const [activeType, setActiveType]   = useState('All');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeTopic !== 'All') params.topic = activeTopic;
    if (activeType  !== 'All') params.type  = activeType;
    if (search) params.search = search;
    getBooks(params)
      .then(r => setBooks(r.data))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, [activeTopic, activeType, search]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="page-header-badge">📚 Library</div>
          <h1>Books & <span className="gradient-text">References</span></h1>
          <p>Essential books, documentation, and cheatsheets for developers</p>
          <div className="search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search books and references..."
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
          <div>
            <p className="filter-label">Type</p>
            <div className="filter-tabs">
              {types.map(t => (
                <button key={t} className={`filter-tab ${activeType === t ? 'active' : ''}`} onClick={() => setActiveType(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">📭</div>
            <p>No books found. Try a different filter.</p>
          </div>
        ) : (
          <>
            <p className="results-count">{books.length} resource{books.length !== 1 ? 's' : ''} found</p>
            <div className="books-grid">
              {books.map(b => <BookCard key={b._id} book={b} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
