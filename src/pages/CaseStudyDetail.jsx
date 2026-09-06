import { useParams, Link, Navigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { getCaseStudyById } from '../data/caseStudies';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const cs = getCaseStudyById(id);
  if (!cs) return <Navigate to="/case-studies" replace />;

  return (
    <>
      <div style={{ background: cs.cover, minHeight: 340 }} className="d-flex align-items-end">
        <div className="container-pl pb-5 pt-5">
          <Breadcrumb items={[{ label: 'Case Studies', to: '/case-studies' }, { label: cs.title }]} />
          <span className="badge-pl bg-white mb-3 d-inline-block">{cs.vertical} · {cs.industry}</span>
          <h1 className="text-white" style={{ maxWidth: 760 }}>{cs.title}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-4 mb-5">
            {cs.results.map((r, i) => (
              <div key={i} className="col-6 col-md-4">
                <div className="p-4 border rounded-3 text-center" style={{ borderColor: 'var(--line)' }}>
                  <div className="stat-num">{r.value}</div>
                  <div className="small text-secondary">{r.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-5">
            <div className="col-lg-6">
              <span className="kicker">The Challenge</span>
              <p className="text-secondary">{cs.challenge}</p>
            </div>
            <div className="col-lg-6">
              <span className="kicker current">Our Approach</span>
              <p className="text-secondary">{cs.approach}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark text-center">
        <div className="container-pl">
          <h3 className="text-white mb-3">Want results like {cs.client}'s?</h3>
          <Link to="/contact" className="btn-pl btn-pl-signal">Talk to Our Team</Link>
        </div>
      </section>
    </>
  );
}
