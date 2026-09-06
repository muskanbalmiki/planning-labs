import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { verticals } from '../../data/services';
import SearchOverlay from './SearchOverlay';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="pl-header">
        <div className="container-pl d-flex align-items-center justify-content-between" style={{ height: 78 }}>
          <Link to="/" className="pl-logo">
            Planning<span>Labs</span>
          </Link>

          <nav className="d-none d-lg-flex align-items-center gap-4">
            <NavLink to="/about" className="pl-nav-link">About</NavLink>

            <div className="pl-nav-item position-relative">
              <NavLink to="/services/experiential-marketing" className="pl-nav-link">Experiential Marketing</NavLink>
              <div className="pl-dropdown">
                {verticals.experiential.services.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`}>{s.name}</Link>
                ))}
              </div>
            </div>

            <div className="pl-nav-item position-relative">
              <NavLink to="/services/digital-marketing" className="pl-nav-link">Digital Marketing</NavLink>
              <div className="pl-dropdown">
                {verticals.digital.services.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`}>{s.name}</Link>
                ))}
              </div>
            </div>

            <NavLink to="/our-work" className="pl-nav-link">Our Work</NavLink>
            <NavLink to="/case-studies" className="pl-nav-link">Case Studies</NavLink>
            <NavLink to="/insights" className="pl-nav-link">Insights</NavLink>
            <NavLink to="/careers" className="pl-nav-link">Careers</NavLink>
          </nav>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-link p-0 text-dark"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <i className="bi bi-search fs-5"></i>
            </button>
            <Link to="/contact" className="btn-pl btn-pl-signal d-none d-md-inline-flex">
              Start a Project
            </Link>
            <button
              className="btn btn-link p-0 text-dark d-lg-none"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'} fs-3`}></i>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="d-lg-none border-top" style={{ borderColor: 'var(--line)' }}>
            <div className="container-pl py-3 d-flex flex-column gap-1">
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

function MobileLink({ to, label }) {
  return (
    <Link to={to} className="py-2 fw-semibold" style={{ fontFamily: 'var(--font-display)' }}>
      {label}
    </Link>
  );
}

function MobileGroup({ title, base, items }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="btn btn-link p-0 py-2 w-100 text-start fw-semibold text-dark text-decoration-none d-flex justify-content-between"
        style={{ fontFamily: 'var(--font-display)' }}
        onClick={() => setOpen((v) => !v)}
      >
        {title} <i className={`bi bi-chevron-${open ? 'up' : 'down'}`}></i>
      </button>
      {open && (
        <div className="ps-3 d-flex flex-column">
          {items.map((s) => (
            <Link key={s.slug} to={`${base}/${s.slug}`} className="py-1 text-secondary">
              {s.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
