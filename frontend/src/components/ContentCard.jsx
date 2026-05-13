import { Link } from 'react-router-dom';
import './ContentCard.css';

/* ── VideoCard ── */
export function VideoCard({ video }) {
  const thumb = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const levelColor = { Beginner: 'emerald', Intermediate: 'amber', Advanced: 'rose' }[video.level] || 'accent';

  return (
    <div className="content-card video-card">
      <div className="card-thumbnail">
        <img src={thumb} alt={video.title} loading="lazy" />
        <div className="play-overlay">
          <div className="play-btn">▶</div>
        </div>
        {video.duration && <span className="duration-badge">{video.duration}</span>}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className={`badge badge-${levelColor}`}>{video.level}</span>
          <span className="badge badge-accent">{video.topic}</span>
        </div>
        <h3 className="card-title">{video.title}</h3>
        <p className="card-desc">{video.description}</p>
        <div className="card-tags">
          {video.tags?.slice(0, 3).map(t => <span key={t} className="tag">#{t}</span>)}
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary card-cta"
        >
          ▶ Watch on YouTube
        </a>
      </div>
    </div>
  );
}

/* ── BookCard ── */
export function BookCard({ book }) {
  const typeColor = { Book: 'accent', Reference: 'teal', Documentation: 'amber', Cheatsheet: 'rose' }[book.type] || 'accent';

  return (
    <div className="content-card book-card">
      <div className="book-cover">
        {book.coverImage
          ? <img src={book.coverImage} alt={book.title} loading="lazy" />
          : <div className="book-cover-placeholder">📚</div>
        }
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className={`badge badge-${typeColor}`}>{book.type}</span>
          {book.free && <span className="badge badge-emerald">Free</span>}
        </div>
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">by {book.author}</p>
        <p className="card-desc">{book.description}</p>
        <div className="card-tags">
          {book.tags?.slice(0, 3).map(t => <span key={t} className="tag">#{t}</span>)}
        </div>
        {book.link && (
          <a href={book.link} target="_blank" rel="noreferrer" className="btn btn-outline card-cta">
            🔗 View Resource
          </a>
        )}
      </div>
    </div>
  );
}

/* ── BlogCard ── */
export function BlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog.slug}`} className="content-card blog-card">
      {blog.coverImage && (
        <div className="card-thumbnail">
          <img src={blog.coverImage} alt={blog.title} loading="lazy" />
        </div>
      )}
      <div className="card-body">
        <div className="card-meta">
          <span className="badge badge-accent">{blog.topic}</span>
          {blog.readTime && <span className="read-time">⏱ {blog.readTime}</span>}
        </div>
        <h3 className="card-title">{blog.title}</h3>
        <p className="card-desc">{blog.excerpt}</p>
        <div className="card-footer">
          <span className="blog-author">✍️ {blog.author}</span>
          <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
}
