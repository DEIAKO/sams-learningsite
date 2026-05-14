import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getVideos } from '../api';
import { VideoCard } from '../components/ContentCard';
import './Page.css';

const topics = ['All', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'CSS', 'TypeScript', 'Java', 'DSA', 'Architecture', 'DevOps', 'SEO'];
const levels  = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTopic, setActiveTopic] = useState(searchParams.get('topic') || 'All');
  const [activeLevel, setActiveLevel] = useState('All');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeTopic !== 'All') params.topic = activeTopic;
    if (activeLevel !== 'All') params.level = activeLevel;
    if (search) params.search = search;
    getVideos(params)
      .then(r => setVideos(r.data))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [activeTopic, activeLevel, search]);

  const handleTopic = (t) => {
    setActiveTopic(t);
    setSearchParams(t !== 'All' ? { topic: t } : {});
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="page-header-badge">📹 Tutorials</div>
          <h1>Coding <span className="gradient-text">Tutorial Videos</span></h1>
          <p>Curated video courses and tutorials for every skill level</p>
          <div className="search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search tutorials..."
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
                <button key={t} className={`filter-tab ${activeTopic === t ? 'active' : ''}`} onClick={() => handleTopic(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="filter-label">Level</p>
            <div className="filter-tabs">
              {levels.map(l => (
                <button key={l} className={`filter-tab ${activeLevel === l ? 'active' : ''}`} onClick={() => setActiveLevel(l)}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : videos.length === 0 ? (
          <div className="empty-state">
            <div className="emoji">📭</div>
            <p>No tutorials found. Try a different filter.</p>
          </div>
        ) : (
          <>
            <p className="results-count">{videos.length} tutorial{videos.length !== 1 ? 's' : ''} found</p>
            <div className="grid-3">
              {videos.map(v => <VideoCard key={v._id} video={v} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
