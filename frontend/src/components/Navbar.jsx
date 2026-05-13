import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { path: '/',        label: 'Home' },
  { path: '/videos',  label: 'Tutorials' },
  { path: '/books',   label: 'Books' },
  { path: '/roadmap', label: 'Roadmap' },
  { path: '/blog',    label: 'Blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">Sam<span className="gradient-text">.learn</span></span>
        </Link>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
