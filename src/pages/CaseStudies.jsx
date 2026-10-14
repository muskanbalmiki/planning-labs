import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';

const isDigital = (c) => String(c.vertical).toLowerCase().includes('digital');

export default function CaseStudies() {
  const [vertical, setVertical] = useState('all');

  // filter buttons are built from the data, so nothing is hard-coded
  const verticals = useMemo(() => [...new Set(caseStudies.map((c) => c.vertical))], []);
  const shown = vertical === 'all' ? caseStudies : caseStudies.filter((c) => c.vertical === vertical);

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

  return (
    <div className="cs-page">
      {/* ================= hero ================= */}
      <header className="cs-hero" onMouseMove={heroMove}>
        <span className="cs-glow g1" aria-hidden="true" />
        <span className="cs-glow g2" aria-hidden="true" />
        <div className="container-pl cs-hero-inner">
          <span className="cs-pill">Case studies</span>
          <h1 className="cs-title">The brief, the approach, the numbers</h1>
          <p className="cs-lead">A closer look at how we planned, built and measured some of our projects.</p>
        </div>
      </header>

      {/* ================= list ================= */}
      <section className="cs-section">
        <div className="container-pl">
          {verticals.length > 1 && (
            <div className="cs-filters" role="group" aria-label="Filter case studies">
              <button
                type="button"
                className={`cs-chip${vertical === 'all' ? ' is-active' : ''}`}
                aria-pressed={vertical === 'all'}
                onClick={() => setVertical('all')}
              >
                All
              </button>
              {verticals.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`cs-chip${vertical === v ? ' is-active' : ''}${String(v).toLowerCase().includes('digital') ? ' is-digital' : ''}`}
                  aria-pressed={vertical === v}
                  onClick={() => setVertical(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          )}

          <div className="cs-list" key={vertical}>
            {shown.map((c) => {
              const digital = isDigital(c);
              return (
                <Link
                  key={c.id}
                  to={`/case-studies/${c.id}`}
                  className={`cs-item${digital ? ' is-digital' : ''}`}
                  onMouseMove={spot}
                >
                  <div className="cs-cover" style={{ background: c.cover }} />

                  <div className="cs-body">
                    <span className="cs-badge">{c.vertical}</span>
                    <h3 className="cs-item-title">{c.title}</h3>
                    <p className="cs-item-text">{c.challenge}</p>

                    <div className="cs-results">
                      {c.results.map((r, i) => (
                        <div key={i} className="cs-result">
                          <b>{r.value}</b>
                          <span>{r.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <span className="cs-go"><i className="bi bi-arrow-up-right"></i></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}