import { Link } from 'react-router-dom';
import { verticals } from '../../data/services';
import SectionHeading from '../common/SectionHeading';

export default function ServiceOverview() {
  return (
    <section className="section">
      <div className="container-pl">
        <SectionHeading
          kicker="What We Do"
          title="Two disciplines. One accountable team."
          subtitle="Every brief runs through both lenses — live experience and digital growth — so nothing gets planned in isolation."
        />
        <div className="row g-4">
          {Object.values(verticals).map((v) => (
            <div key={v.slug} className="col-md-6">
              <div
                className="p-4 p-lg-5 h-100 rounded-3"
                style={{
                  background: v.accent === 'signal' ? 'var(--ink)' : 'var(--current)',
                  color: 'var(--paper)',
                }}
              >
                <span className="kicker" style={{ color: v.accent === 'signal' ? 'var(--signal)' : '#5fd6c9' }}>
                  {v.name}
                </span>
                <h3 className="text-white mb-3">{v.tagline}</h3>
                <p className="text-white-50 mb-4">{v.description}</p>
                <ul className="list-unstyled mb-4">
                  {v.services.slice(0, 4).map((s) => (
                    <li key={s.slug} className="mb-2 text-white-50">
                      <i className="bi bi-arrow-right-short me-1"></i>
                      <Link to={`/services/${s.slug}`} className="text-white-50">{s.name}</Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${v.slug}`} className="btn-pl btn-pl-outline-light">
                  Explore {v.name} <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
