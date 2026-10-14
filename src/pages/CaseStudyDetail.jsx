import { useParams, Link, Navigate } from 'react-router-dom';
import { caseStudies, getCaseStudyById } from '../data/caseStudies';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const cs = getCaseStudyById(id);
  if (!cs) return <Navigate to="/case-studies" replace />;

  const digital = String(cs.vertical).toLowerCase().includes('digital');

  // previous / next case study (wraps around)
  const idx = caseStudies.findIndex((c) => c.id === cs.id);
  const prev = caseStudies[(idx - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(idx + 1) % caseStudies.length];
  const hasMore = caseStudies.length > 1;

  // light follows the cursor on cards
  const spot = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className={`cs-page${digital ? ' is-digital' : ''}`}>
      {/* ================= hero on the project cover ================= */}
      <header className="cs-dhero">
        <div className="cs-dhero-bg" style={{ background: cs.cover }} aria-hidden="true" />
        <div className="container-pl cs-dhero-inner">
          <Link to="/case-studies" className="cs-back">
            <i className="bi bi-arrow-left"></i> All case studies
          </Link>
          <span className="cs-pill">{cs.vertical} · {cs.industry}</span>
          <h1 className="cs-title">{cs.title}</h1>
          {cs.client && <p className="cs-lead">Client: {cs.client}</p>}
        </div>
      </header>

      {/* ================= results ================= */}
      <section className="cs-section cs-first">
        <div className="container-pl">
          <div className="cs-stats">
            {cs.results.map((r, i) => (
              <div key={i} className="cs-stat" onMouseMove={spot}>
                <b>{r.value}</b>
                <span>{r.label}</span>
              </div>
            ))}
          </div>

          {/* ================= challenge + approach ================= */}
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="cs-story" onMouseMove={spot}>
                <span className="cs-pill">The challenge</span>
                <p>{cs.challenge}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cs-story cs-story-alt" onMouseMove={spot}>
                <span className="cs-pill cs-pill-vio">Our approach</span>
                <p>{cs.approach}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= previous / next ================= */}
      {hasMore && (
        <section className="cs-section cs-tight">
          <div className="container-pl">
            <div className="cs-next">
              <Link to={`/case-studies/${prev.id}`} className="cs-nav" onMouseMove={spot}>
                <span className="cs-nav-label"><i className="bi bi-arrow-left"></i> Previous</span>
                <span className="cs-nav-title">{prev.title}</span>
              </Link>
              <Link to={`/case-studies/${next.id}`} className="cs-nav cs-nav-right" onMouseMove={spot}>
                <span className="cs-nav-label">Next <i className="bi bi-arrow-right"></i></span>
                <span className="cs-nav-title">{next.title}</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ================= closing call to action ================= */}
      <section className="cs-section cs-last">
        <div className="container-pl">
          <div className="cs-cta">
            <div>
              <span className="cs-pill">Your turn</span>
              <h2 className="cs-h2">Want results like {cs.client}'s?</h2>
            </div>
            <Link to="/contact" className="cs-btn">
              <span className="cs-btn-icon"><i className="bi bi-arrow-right"></i></span>
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}