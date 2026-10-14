import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';

const perks = [
  { icon: 'bi-lightbulb', title: 'Cross-discipline work', text: 'Move between experiential and digital briefs instead of sitting in one silo.' },
  { icon: 'bi-tools', title: 'In-house production', text: 'Fabrication, edit and media desks on-site — see your work built, not just briefed.' },
  { icon: 'bi-graph-up-arrow', title: 'Real ownership', text: 'Client-facing roles from early on, with senior support when you need it.' },
];

/* ---- job helpers: if your jobs data uses other field names, change them here ---- */
const titleOf = (j) => j.title || j.role || j.name || 'Open role';
const deptOf = (j) => j.department || '';
const locOf = (j) => j.location || '';
const typeOf = (j) => j.type || j.employmentType || '';
const expOf = (j) => j.experience || j.exp || '';
const textOf = (j) => j.summary || j.description || j.about || '';

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Careers() {
  const [dept, setDept] = useState('All');
  const [openId, setOpenId] = useState(null);

  const departments = useMemo(() => ['All', ...new Set(jobs.map((j) => j.department))], []);
  const counts = useMemo(() => {
    const c = { All: jobs.length };
    jobs.forEach((j) => {
      c[j.department] = (c[j.department] || 0) + 1;
    });
    return c;
  }, []);

  const filtered = useMemo(
    () => (dept === 'All' ? jobs : jobs.filter((j) => j.department === dept)),
    [dept]
  );

  const pick = (d) => {
    setDept(d);
    setOpenId(null);
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

  return (
    <div className="car-page">
      {/* ================= hero ================= */}
      <header className="car-hero" onMouseMove={heroMove}>
        <span className="car-glow g1" aria-hidden="true" />
        <span className="car-glow g2" aria-hidden="true" />
        <div className="container-pl car-hero-inner">
          <span className="car-pill">Join Planning Labs</span>
          <h1 className="car-title">Build brand moments for a living</h1>
          <p className="car-lead">Work on experiential and digital briefs side by side, with the people who build them.</p>
          <button type="button" className="car-btn" onClick={() => goTo('car-roles')}>
            <span className="car-btn-icon"><i className="bi bi-arrow-down"></i></span>
            See open roles ({jobs.length})
          </button>
        </div>
      </header>

      {/* ================= why join ================= */}
      <section className="car-section">
        <div className="container-pl">
          <div className="car-perks">
            {perks.map((p) => (
              <div key={p.title} className="car-perk" onMouseMove={spot}>
                <span className="car-icon"><i className={`bi ${p.icon}`}></i></span>
                <h3 className="car-perk-title">{p.title}</h3>
                <p className="car-perk-text">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= open roles ================= */}
      <section className="car-section car-alt" id="car-roles">
        <div className="container-pl">
          <div className="car-head">
            <div>
              <span className="car-pill">Open roles</span>
              <h2 className="car-h2">
                {filtered.length} {filtered.length === 1 ? 'role' : 'roles'} open
              </h2>
            </div>

            <div className="car-chips" role="group" aria-label="Filter by department">
              {departments.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`car-chip${dept === d ? ' is-active' : ''}`}
                  aria-pressed={dept === d}
                  onClick={() => pick(d)}
                >
                  {d} <em>{counts[d]}</em>
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="car-empty">
              <h3>No open roles in this team right now</h3>
              <p>Check another department, or send us your CV and we'll keep it on file.</p>
            </div>
          ) : (
            <div className="car-list" key={dept}>
              {filtered.map((j) => {
                const open = openId === j.id;
                const meta = [locOf(j), typeOf(j), expOf(j)].filter(Boolean);
                return (
                  <div key={j.id} className={`car-job${open ? ' is-open' : ''}`} onMouseMove={spot}>
                    <button
                      type="button"
                      className="car-job-head"
                      aria-expanded={open}
                      aria-controls={`car-panel-${j.id}`}
                      onClick={() => setOpenId(open ? null : j.id)}
                    >
                      <span className="car-job-main">
                        {deptOf(j) && <span className="car-tag">{deptOf(j)}</span>}
                        <span className="car-job-title">{titleOf(j)}</span>
                        {meta.length > 0 && (
                          <span className="car-meta">
                            {meta.map((m) => <span key={m}>{m}</span>)}
                          </span>
                        )}
                      </span>
                      <span className="car-toggle" aria-hidden="true"><i className="bi bi-plus-lg"></i></span>
                    </button>

                    <div className="car-panel" id={`car-panel-${j.id}`} role="region">
                      <div className="car-panel-inner">
                        {textOf(j) && <p className="car-job-text">{textOf(j)}</p>}
                        <Link
  to={`/careers/${encodeURIComponent(String(j.id))}`}
  className="car-btn car-btn-sm"
>
  <span className="car-btn-icon">
    <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
  </span>
  View &amp; apply
</Link>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= closing call to action ================= */}
      <section className="car-section car-last">
        <div className="container-pl">
          <div className="car-cta">
            <div>
              <span className="car-pill">Not listed?</span>
              <h2 className="car-h2 mb-0">Don't see your role? Tell us what you do best.</h2>
            </div>
            <Link to="/contact" className="car-btn">
              <span className="car-btn-icon"><i className="bi bi-arrow-right"></i></span>
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}