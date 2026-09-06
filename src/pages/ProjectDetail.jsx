import { useParams, Link, Navigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import ProjectCard from '../components/common/ProjectCard';
import { getProjectById, projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);
  if (!project) return <Navigate to="/our-work" replace />;

  const more = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);

  return (
    <>
      <div style={{ background: project.cover, minHeight: 340 }} className="d-flex align-items-end">
        <div className="container-pl pb-5 pt-5">
          <Breadcrumb items={[{ label: 'Our Work', to: '/our-work' }, { label: project.title }]} />
          <span className="badge-pl bg-white mb-3 d-inline-block">{project.service}</span>
          <h1 className="text-white" style={{ maxWidth: 700 }}>{project.title}</h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-8">
              <p style={{ fontSize: '1.1rem' }} className="text-secondary">{project.summary}</p>
              <p className="text-secondary">
                This project was delivered by our {project.category === 'experiential' ? 'Experiential Marketing' : 'Digital Marketing'}
                {' '}team, coordinated with client stakeholders from brief through delivery, and closed out
                with a full measurement report against the goals agreed at kickoff.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="p-4 rounded-3" style={{ background: 'var(--paper-dim)' }}>
                <div className="mb-3">
                  <div className="small text-secondary">Client Industry</div>
                  <div className="fw-semibold" style={{ fontFamily: 'var(--font-display)' }}>{project.industry}</div>
                </div>
                <div className="mb-3">
                  <div className="small text-secondary">Service</div>
                  <div className="fw-semibold" style={{ fontFamily: 'var(--font-display)' }}>{project.service}</div>
                </div>
                <div>
                  <div className="small text-secondary">Year</div>
                  <div className="fw-semibold" style={{ fontFamily: 'var(--font-display)' }}>{project.year}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section" style={{ background: 'var(--paper-dim)' }}>
          <div className="container-pl">
            <h4 className="mb-4">More like this</h4>
            <div className="row g-4">
              {more.map((p) => (
                <div key={p.id} className="col-md-4">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section text-center">
        <div className="container-pl">
          <h3 className="mb-3">Have something similar in mind?</h3>
          <Link to="/contact" className="btn-pl btn-pl-signal">Start a Conversation</Link>
        </div>
      </section>
    </>
  );
}
