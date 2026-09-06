import { Link } from 'react-router-dom';
import { stats } from '../../data/stats';

export default function Hero() {
  return (
    <section className="hero-pl">
      <div className="container-pl">
        <div className="row align-items-end">
          <div className="col-lg-8">
            <span className="eyebrow-line">Mumbai · Experiential + Digital</span>
            <h1 className="mb-4">
              We build brand experiences, on the ground and on the feed.
            </h1>
            <p className="text-secondary mb-4" style={{ maxWidth: 560, fontSize: '1.1rem' }}>
              Planning Labs is a full-service marketing agency running two disciplines
              under one roof — live experiential production and full-funnel digital
              growth — for brands who need both to move at the same pace.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/contact" className="btn-pl btn-pl-signal">
                Start a Project <i className="bi bi-arrow-right"></i>
              </Link>
              <Link to="/our-work" className="btn-pl btn-pl-outline-dark">
                See Our Work
              </Link>
            </div>
          </div>
          <div className="col-lg-4 d-none d-lg-block">
            <div style={{
              aspectRatio: '3/4',
              borderRadius: 4,
              background: 'linear-gradient(155deg, var(--signal), var(--ink) 55%, var(--current))',
            }} />
          </div>
        </div>

        <div className="row hero-stat-strip g-0">
          {stats.map((s, i) => (
            <div key={i} className="col-6 col-md-3 item">
              <div className="stat-num">{s.value}</div>
              <div className="small text-secondary">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
