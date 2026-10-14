import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

const categories = ['All', 'Experiential', 'Digital'];

/* ---- blog helpers: if your blogs data uses other field names, change them here ---- */
const titleOf = (b) => b.title || b.name || '';
const catOf = (b) => b.category || '';
const imgOf = (b) => b.image || b.img || b.cover || b.thumbnail || '';
const excerptOf = (b) => b.excerpt || b.summary || b.description || '';
const dateOf = (b) => b.date || b.published || '';
const readOf = (b) => b.readTime || b.read || '';
const linkOf = (b) => `/insights/${b.slug || b.id}`; // use your real article route

const isDigital = (b) => String(catOf(b)).toLowerCase().includes('digital');

export default function Insights() {
  const [category, setCategory] = useState('All');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return blogs.filter((b) => {
      const catOk = category === 'All' || b.category === category;
      const qOk = term === '' || titleOf(b).toLowerCase().includes(term) || excerptOf(b).toLowerCase().includes(term);
      return catOk && qOk;
    });
  }, [category, q]);

  // number of articles per category, shown on the filter buttons
  const counts = useMemo(() => {
    const c = { All: blogs.length };
    categories.slice(1).forEach((k) => {
      c[k] = blogs.filter((b) => b.category === k).length;
    });
    return c;
  }, []);

  const filtering = category !== 'All' || q.trim() !== '';
  const featured = !filtering && filtered.length > 2 ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  const reset = () => {
    setCategory('All');
    setQ('');
  };

  const heroMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  // light follows the cursor on each card
  const spot = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const Meta = ({ b }) => (
    <span className="ins-meta">
      {dateOf(b) && <span>{dateOf(b)}</span>}
      {readOf(b) && <span>{readOf(b)}</span>}
    </span>
  );

  return (
    <div className="ins-page">
      {/* ================= hero ================= */}
      <header className="ins-hero" onMouseMove={heroMove}>
        <span className="ins-glow g1" aria-hidden="true" />
        <span className="ins-glow g2" aria-hidden="true" />
        <div className="container-pl ins-hero-inner">
          <span className="ins-pill">Insights &amp; blogs</span>
          <h1 className="ins-title">Notes from the field — experiential and digital</h1>
          <p className="ins-lead">What we're learning from the projects we plan, build and measure.</p>
        </div>
      </header>

      {/* ================= filters + articles ================= */}
      <section className="ins-section">
        <div className="container-pl">
          <div className="ins-bar">
            <div className="ins-chips" role="group" aria-label="Filter articles">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`ins-chip${category === c ? ' is-active' : ''}${c === 'Digital' ? ' is-digital' : ''}`}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c} <em>{counts[c]}</em>
                </button>
              ))}
            </div>

            <label className="ins-search">
              <i className="bi bi-search" aria-hidden="true"></i>
              <input
                type="text"
                placeholder="Search articles…"
                aria-label="Search articles"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              {q && (
                <button type="button" className="ins-x" aria-label="Clear search" onClick={() => setQ('')}>
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </label>
          </div>

          {filtering && (
            <div className="ins-count" aria-live="polite">
              Showing <b>{filtered.length}</b> {filtered.length === 1 ? 'article' : 'articles'}
              <button type="button" className="ins-clear" onClick={reset}>Clear filters</button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="ins-empty">
              <h3>No articles match your search</h3>
              <p>Try another word, or start again from all articles.</p>
              <button type="button" className="ins-btn" onClick={reset}>
                <span className="ins-btn-icon"><i className="bi bi-arrow-counterclockwise"></i></span>
                Show all articles
              </button>
            </div>
          ) : (
            <div key={`${category}-${q}`} className="ins-wrap">
              {/* newest article, large */}
              {featured && (
                <Link
                  to={linkOf(featured)}
                  className={`ins-feature${isDigital(featured) ? ' is-digital' : ''}`}
                  onMouseMove={spot}
                >
                  <span
                    className="ins-feature-img"
                    style={imgOf(featured) ? { backgroundImage: `url(${imgOf(featured)})` } : undefined}
                  />
                  <span className="ins-feature-body">
                    <span className="ins-tag">{catOf(featured)}</span>
                    <span className="ins-feature-title">{titleOf(featured)}</span>
                    {excerptOf(featured) && <span className="ins-excerpt">{excerptOf(featured)}</span>}
                    <Meta b={featured} />
                  </span>
                  <span className="ins-go"><i className="bi bi-arrow-up-right"></i></span>
                </Link>
              )}

              <div className="ins-grid">
                {rest.map((b) => (
                  <Link
                    key={b.id}
                    to={linkOf(b)}
                    className={`ins-card${isDigital(b) ? ' is-digital' : ''}`}
                    onMouseMove={spot}
                  >
                    <span
                      className="ins-card-img"
                      style={imgOf(b) ? { backgroundImage: `url(${imgOf(b)})` } : undefined}
                    >
                      <span className="ins-tag">{catOf(b)}</span>
                    </span>
                    <span className="ins-card-body">
                      <span className="ins-card-title">{titleOf(b)}</span>
                      {excerptOf(b) && <span className="ins-excerpt">{excerptOf(b)}</span>}
                      <span className="ins-card-foot">
                        <Meta b={b} />
                        <span className="ins-go"><i className="bi bi-arrow-up-right"></i></span>
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}