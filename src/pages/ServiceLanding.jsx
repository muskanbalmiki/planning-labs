import { useParams, Link, Navigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import EnquiryForm from '../components/common/EnquiryForm';
import ProjectCard from '../components/common/ProjectCard';
import { verticals } from '../data/services';
import { projects } from '../data/projects';

export default function ServiceLanding() {
  const { slug } = useParams();
  const vertical = Object.values(verticals).find((v) => v.slug === slug);

  if (!vertical) return <Navigate to="/" replace />;

  const isSignal = vertical.accent === 'signal';
  const related = projects.filter((p) => p.category === (isSignal ? 'experiential' : 'digital')).slice(0, 4);

  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: vertical.name }]} />
          <span className="eyebrow-line">{vertical.name}</span>
          <h1 style={{ maxWidth: 760 }}>{vertical.tagline}</h1>
          <p className="text-secondary mt-3" style={{ maxWidth: 620 }}>{vertical.description}</p>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-4">
            {vertical.services.map((s, i) => (
              <div key={s.slug} className="col-md-6 col-lg-3">
                <Link
                  to={`/services/${s.slug}`}
                  className="card-pl d-block h-100 p-4 text-decoration-none"
                >
                  <span className="divider-num">{String(i + 1).padStart(2, '0')}</span>
                  <h6 className="mt-3 mb-2">{s.name}</h6>
                  <p className="small text-secondary mb-0">{s.summary}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-dim)' }}>
        <div className="container-pl">
          <div className="d-flex justify-content-between align-items-end mb-5 flex-wrap">
            <h3 className="mb-0">Related work</h3>
            <Link to="/our-work" className="btn-pl btn-pl-outline-dark">View All</Link>
          </div>
          <div className="row g-4">
            {related.map((p) => (
              <div key={p.id} className="col-md-6 col-lg-3">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-6">
              <span className="kicker" style={isSignal ? {} : { color: 'var(--current-light)' }}>Get Started</span>
              <h2 className="mb-3">Send us your {vertical.name.toLowerCase()} brief</h2>
              <p className="text-secondary">We'll respond within one business day with next steps and, where useful, a relevant case study.</p>
            </div>
            <div className="col-lg-6">
              <EnquiryForm defaultService={vertical.services[0]?.slug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
