import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projects, industries } from '../data/projects';

const categoryFilters = [
  { key: 'all', label: 'All Work' },
  { key: 'experiential', label: 'Experiential' },
  { key: 'digital', label: 'Digital' },
];

/* ---- project card helpers (same as the featured work / service pages) ----
   If your projects data uses other field names, change them here.            */
const catOf = (p) => p.category || p.service || '';
const imgOf = (p) => p.image || p.img || p.cover || p.thumbnail || '';
const titleOf = (p) => p.title || p.name || '';
const linkOf = (p) => `/work/${p.slug || p.id}`; // use your real project page route

export default function OurWork() {
  const [category, setCategory] = useState('all');
  const [industry, setIndustry] = useState('all');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catOk = category === 'all' || p.category === category;
      const indOk = industry === 'all' || p.industry === industry;
      return catOk && indOk;
    });
  }, [category, industry]);

  const reset = () => {
    setCategory('all');
    setIndustry('all');
  };

  // glow in the hero follows the mouse (same idea as the landing hero)
  const heroMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <div className="ow-page">
      {/* ================= hero ================= */}
      <header className="ow-hero" onMouseMove={heroMove}>
        <span className="ow-glow g1" aria-hidden="true" />
        <span className="ow-glow g2" aria-hidden="true" />
        <div className="container-pl ow-hero-inner">
          <span className="ow-pill">Our work</span>
          <h1 className="ow-title">Work across experiential and digital, filtered your way</h1>
          <p className="ow-lead">Pick a discipline or an industry and see only the projects that matter to you.</p>
        </div>
      </header>

      {/* ================= filters + cards ================= */}
      <section className="ow-section">
        <div className="container-pl">
          <div className="ow-filters">
            <div className="ow-filter-row" role="group" aria-label="Filter by discipline">
              {categoryFilters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`ow-chip is-${f.key}${category === f.key ? ' is-active' : ''}`}
                  aria-pressed={category === f.key}
                  onClick={() => setCategory(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="ow-filter-row ow-scroll" role="group" aria-label="Filter by industry">
              <button
                type="button"
                className={`ow-chip ow-chip-sm${industry === 'all' ? ' is-active' : ''}`}
                aria-pressed={industry === 'all'}
                onClick={() => setIndustry('all')}
              >
                All Industries
              </button>
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  className={`ow-chip ow-chip-sm${industry === ind ? ' is-active' : ''}`}
                  aria-pressed={industry === ind}
                  onClick={() => setIndustry(ind)}
                >
                  {ind}
                </button>
              ))}
            </div>

            <div className="ow-meta" aria-live="polite">
              <span>
                Showing <b>{filtered.length}</b> {filtered.length === 1 ? 'project' : 'projects'}
              </span>
              {(category !== 'all' || industry !== 'all') && (
                <button type="button" className="ow-clear" onClick={reset}>
                  Clear filters <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="ow-empty">
              <h3>No projects match these filters yet</h3>
              <p>Try a different combination, or start again from all work.</p>
              <button type="button" className="ow-btn" onClick={reset}>
                <span className="ow-btn-icon"><i className="bi bi-arrow-counterclockwise"></i></span>
                Show all work
              </button>
            </div>
          ) : (
            <div className="ow-grid" key={`${category}-${industry}`}>
              {filtered.map((p) => {
                const digital = String(catOf(p)).toLowerCase().includes('digital');
                const img = imgOf(p);
                return (
                  <Link
                    key={p.id}
                    to={linkOf(p)}
                    className="fw-card"
                    style={{
                      '--accent': digital ? '#b89bdd' : '#ffc756',
                      '--on': digital ? '#1a1024' : '#2a1a05',
                      '--tint': digital ? 'rgba(122,84,167,0.62)' : 'rgba(255,155,23,0.5)',
                    }}
                  >
                    <span className="fw-photo" style={img ? { backgroundImage: `url(${img})` } : undefined} />

                    <span className="fw-top">
                      {catOf(p) && <span className="fw-tag">{catOf(p)}</span>}
                      {p.year && <span className="fw-year">{p.year}</span>}
                    </span>

                    <span className="fw-bottom">
                      <span className="fw-name">{titleOf(p)}</span>
                    </span>

                    <span className="fw-go"><i className="bi bi-arrow-up-right"></i></span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= closing call to action ================= */}
      <section className="ow-section ow-last">
        <div className="container-pl">
          <div className="ow-cta">
            <div>
              <span className="ow-pill">Next project</span>
              <h2 className="ow-h2">Have a brief? Let's plan it.</h2>
            </div>
            <Link to="/contact" className="ow-btn">
              <span className="ow-btn-icon"><i className="bi bi-arrow-right"></i></span>
              Let's talk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}