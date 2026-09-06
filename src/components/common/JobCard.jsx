import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="job-card d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
      <div>
        <h5 className="mb-2">{job.title}</h5>
        <div className="d-flex flex-wrap gap-2">
          <span className="badge-pl">{job.department}</span>
          <span className="badge-pl"><i className="bi bi-geo-alt me-1"></i>{job.location}</span>
          <span className="badge-pl">{job.type}</span>
        </div>
      </div>
      <Link to={`/careers/${job.id}`} className="btn-pl btn-pl-outline-dark">
        View & Apply <i className="bi bi-arrow-right"></i>
      </Link>
    </div>
  );
}
