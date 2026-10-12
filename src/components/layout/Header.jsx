import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { verticals } from '../../data/services';
import SearchOverlay from './SearchOverlay';

function MobileLink({ to, label }) {
  return (
    <NavLink to={to} className="pl-m-link">
      {label}
    </NavLink>
  );
}

function MobileGroup({ title, base, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pl-m-group">
      <button
        type="button"
        className="pl-m-link pl-m-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <i className={`bi ${open ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
      </button>
      {open && (
        <div className="pl-m-sub">
          {items.map((s) => (
            <Link key={s.slug} to={`${base}/${s.slug}`} className="pl-m-sublink">
              {s.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Esc closes the menu
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`pl-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container-pl pl-bar">
          {/* logo */}
          <Link to="/" className="pl-logo">
            <img src="/images/planninglabs logo.png" alt="PlanningLabs" />
          </Link>

          {/* search, button, hamburger */}
          <div className="pl-right">
            <button
              type="button"
              className="pl-icon-btn"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <i className="bi bi-search"></i>
            </button>

            <Link to="/contact" className="pl-talk">
              Let's talk
              <span className="pl-talk-icon">
                <i className="bi bi-arrow-right"></i>
              </span>
            </Link>

            <button
              type="button"
              className="pl-icon-btn pl-burger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
            </button>
          </div>
        </div>

        {/* dropdown menu (all screen sizes) */}
        {menuOpen && (
          <div className="pl-mobile">
            <div className="container-pl pl-mobile-inner">
              <MobileLink to="/about" label="About" />
              <MobileGroup title="Experiential Marketing" base="/services" items={verticals.experiential.services} />
              <MobileGroup title="Digital Marketing" base="/services" items={verticals.digital.services} />
              <MobileLink to="/our-work" label="Our Work" />
              <MobileLink to="/case-studies" label="Case Studies" />
              <MobileLink to="/insights" label="Insights" />
              <MobileLink to="/careers" label="Careers" />
              <MobileLink to="/contact" label="Contact" />
            </div>
          </div>
        )}
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  );
}