import { Link } from 'react-router-dom';
import './Footer.css';

const footerLinks = [
  { label: 'Tutorials', path: '/videos' },
  { label: 'Books', path: '/books' },
  { label: 'Roadmap', path: '/roadmap' },
  { label: 'Blog', path: '/blog' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="divider" />
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">⚡ Sam<span className="gradient-text">.learn</span></span>
          <p>A community learning platform for developers — tutorials, books, roadmaps & blogs all in one place.</p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            {footerLinks.map(({ label, path }) => (
              <li key={path}><Link to={path}>{label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-links">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">MDN Web Docs</a></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://stackoverflow.com" target="_blank" rel="noreferrer">Stack Overflow</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sam.learn — Built with ❤️ using MERN Stack</p>
      </div>
    </footer>
  );
}
