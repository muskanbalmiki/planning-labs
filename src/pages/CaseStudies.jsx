import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudies() {
  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'Case Studies' }]} />
          <span className="eyebrow-line">Proof of Work</span>
          <h1 style={{ maxWidth: 700 }}>The brief, the approach, the numbers</h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="d-flex flex-column gap-4">
            {caseStudies.map((c) => (
              <Link
                key={c.id}
                to={`/case-studies/${c.id}`}
                className="card-pl d-flex flex-column flex-md-row text-decoration-none overflow-hidden"
              >
                <div style={{ background: c.cover, minWidth: 260, minHeight: 200 }} className="flex-shrink-0" />
                <div className="p-4 p-lg-5">
                  <span className="badge-pl mb-3 d-inline-block">{c.vertical}</span>
                  <h4 className="mb-2">{c.title}</h4>
                  <p className="text-secondary mb-3">{c.challenge}</p>
                  <div className="d-flex flex-wrap gap-4">
                    {c.results.map((r, i) => (
                      <div key={i}>
                        <div className="stat-num" style={{ fontSize: '1.6rem' }}>{r.value}</div>
                        <div className="small text-secondary">{r.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
