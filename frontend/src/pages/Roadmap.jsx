import { useEffect, useState } from 'react';
import { getRoadmaps, getRoadmap } from '../api';
import './Roadmap.css';

export default function Roadmap() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getRoadmaps()
      .then(r => {
        setRoadmaps(r.data);
        if (r.data.length > 0) setSelected(r.data[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading"><div className="spinner" /></div>;

  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <div className="page-header-badge">🗺️ Roadmaps</div>
          <h1>Learning <span className="gradient-text">Roadmaps</span></h1>
          <p>Step-by-step guides to master any technology from scratch</p>
        </div>
      </div>

      <div className="container section">
        {/* Roadmap Selector */}
        <div className="roadmap-selector">
          {roadmaps.map(r => (
            <button
              key={r._id}
              className={`rm-select-btn ${selected?._id === r._id ? 'active' : ''}`}
              onClick={() => setSelected(r)}
              style={{ '--rm-color': r.color }}
            >
              <span>{r.icon}</span>
              <span>{r.topic}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="roadmap-detail animate-fade-in">
            {/* Header */}
            <div className="rm-detail-header" style={{ '--rm-color': selected.color }}>
              <div className="rm-detail-icon">{selected.icon}</div>
              <div>
                <h2>{selected.title}</h2>
                <p>{selected.description}</p>
                {selected.estimatedTime && (
                  <span className="rm-time-badge">⏱ {selected.estimatedTime}</span>
                )}
              </div>
            </div>

            {/* Steps */}
            <div className="rm-steps">
              {selected.steps?.map((step, idx) => (
                <div key={step._id || idx} className="rm-step">
                  <div className="rm-step-marker" style={{ '--rm-color': selected.color }}>
                    <span className="rm-step-num">{step.order}</span>
                    {idx < selected.steps.length - 1 && <div className="rm-connector" />}
                  </div>
                  <div className="rm-step-content">
                    <h3>{step.title}</h3>
                    {step.description && <p>{step.description}</p>}
                    {step.resources?.length > 0 && (
                      <div className="rm-resources">
                        {step.resources.map((res, i) => (
                          <a key={i} href={res.url} target="_blank" rel="noreferrer" className="rm-resource-link">
                            🔗 {res.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
