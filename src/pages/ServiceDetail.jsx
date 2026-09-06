import { useParams, Link, Navigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import EnquiryForm from '../components/common/EnquiryForm';
import ProjectCard from '../components/common/ProjectCard';
import { getServiceBySlug } from '../data/services';
import { projects } from '../data/projects';

const processSteps = [
  { title: 'Brief & discovery', text: 'We align on objective, audience and constraints before any concept work starts.' },
  { title: 'Concept & planning', text: 'Strategy, creative direction and a detailed project plan, shared for sign-off.' },
  { title: 'Production & execution', text: 'In-house production teams build and deliver, with weekly checkpoints.' },
  { title: 'Measurement & report', text: 'A closing report against the metrics we agreed on at the brief stage.' },
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const result = getServiceBySlug(slug);

  if (!result) return <Navigate to="/" replace />;
  const { vertical, ...service } = result;
  const isSignal = vertical.accent === 'signal';
  const related = projects.filter((p) => p.service === service.name).slice(0, 3);
  const fallbackRelated = related.length ? related : projects.filter((p) => p.category === (isSignal ? 'experiential' : 'digital')).slice(0, 3);

  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: vertical.name, to: `/services/${vertical.slug}` }, { label: service.name }]} />
          <span className="eyebrow-line">{vertical.name}</span>
          <h1 style={{ maxWidth: 700 }}>{service.name}</h1>
          <p className="text-secondary mt-3" style={{ maxWidth: 600, fontSize: '1.05rem' }}>{service.summary}</p>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-8">
              <h4 className="mb-3">How we approach {service.name.toLowerCase()}</h4>
              <p className="text-secondary">
                Our {service.name.toLowerCase()} work sits inside the broader {vertical.name.toLowerCase()}
                {' '}practice, backed by in-house production, design and measurement teams so nothing
                depends on an external vendor's timeline. Every engagement starts with a clear
                brief and closes with a report against the metrics agreed upfront.
              </p>
              <div className="row g-4 mt-2">
                {processSteps.map((p, i) => (
                  <div key={i} className="col-sm-6">
                    <span className="divider-num">{String(i + 1).padStart(2, '0')}</span>
                    <h6 className="mt-2 mb-1">{p.title}</h6>
                    <p className="small text-secondary mb-0">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sticky-side p-4 rounded-3" style={{ background: 'var(--paper-dim)' }}>
                <h6 className="mb-3">Other {vertical.name} services</h6>
                <div className="d-flex flex-column gap-2">
                  {vertical.services.filter((s) => s.slug !== service.slug).map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="small py-1">
                      <i className="bi bi-arrow-right-short me-1"></i>{s.name}
                    </Link>
                  ))}
                </div>
                <Link to={`/services/${vertical.slug}`} className="btn-pl btn-pl-outline-dark w-100 justify-content-center mt-4">
                  All {vertical.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {fallbackRelated.length > 0 && (
        <section className="section" style={{ background: 'var(--paper-dim)' }}>
          <div className="container-pl">
            <h4 className="mb-4">Related projects</h4>
            <div className="row g-4">
              {fallbackRelated.map((p) => (
                <div key={p.id} className="col-md-4">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-6">
              <span className="kicker" style={isSignal ? {} : { color: 'var(--current-light)' }}>Enquire</span>
              <h2 className="mb-3">Ready to talk {service.name.toLowerCase()}?</h2>
              <p className="text-secondary">Share a few details below and the right specialist on our team will follow up directly.</p>
            </div>
            <div className="col-lg-6">
              <EnquiryForm defaultService={service.slug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
