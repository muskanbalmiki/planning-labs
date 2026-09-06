import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/our-work/${project.id}`} className={`project-card d-block ${project.category}`}>
      <div className="thumb" style={{ background: project.cover }} />
      <div className="info">
        <span className="tag-pill">{project.service}</span>
        <h5 className="text-white mb-1">{project.title}</h5>
        <p className="mb-0 small text-white-50">{project.industry} · {project.year}</p>
      </div>
    </Link>
  );
}
