import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlog } from '../api';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    setLoading(true);
    getBlog(slug)
      .then(r => setBlog(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="loading" style={{paddingTop:'140px'}}><div className="spinner" /></div>;
  if (error || !blog) return (
    <div className="blog-post-error">
      <h2>Post not found 😕</h2>
      <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
    </div>
  );

  return (
    <div className="blog-post-page">
      <div className="bp-hero">
        <div className="container">
          <Link to="/blog" className="bp-back">← Back to Blog</Link>
          <div className="bp-meta">
            <span className="badge badge-accent">{blog.topic}</span>
            {blog.readTime && <span className="bp-readtime">⏱ {blog.readTime}</span>}
          </div>
          <h1 className="bp-title">{blog.title}</h1>
          <div className="bp-author-row">
            <div className="bp-avatar">{blog.author[0]}</div>
            <div>
              <p className="bp-author-name">{blog.author}</p>
              <p className="bp-date">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container bp-body">
        <div className="bp-tags">
          {blog.tags?.map(t => <span key={t} className="tag code-font">#{t}</span>)}
        </div>
        <div className="bp-content">
          {blog.content.split('\n').map((line, i) => {
            if (line.startsWith('# '))  return <h1 key={i}>{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>;
            if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>;
            if (line.startsWith('```')) return <div key={i} className="code-block-marker" />;
            if (line.startsWith('- '))  return <li key={i}>{line.slice(2)}</li>;
            if (line.trim() === '')     return <br key={i} />;
            return <p key={i}>{line}</p>;
          })}
        </div>

        <div className="bp-footer">
          <Link to="/blog" className="btn btn-outline">← More Posts</Link>
        </div>
      </div>
    </div>
  );
}
