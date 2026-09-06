import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import ProjectCard from '../common/ProjectCard';
import SectionHeading from '../common/SectionHeading';

export default function FeaturedWork() {
  const featured = projects.slice(0, 4);
  return (
    <section className="section" style={{ background: 'var(--paper-dim)' }}>
      <div className="container-pl">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-5">
          <SectionHeading
            kicker="Selected Work"
            title="Recent projects across both disciplines"
            subtitle=""
          />
          <Link to="/our-work" className="btn-pl btn-pl-outline-dark mb-5">
            View Full Portfolio <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="row g-4">
          {featured.map((p) => (
            <div key={p.id} className="col-md-6 col-lg-3">
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
