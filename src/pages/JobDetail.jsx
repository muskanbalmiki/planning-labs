import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { getJobById } from '../data/jobs';

export default function JobDetail() {
  const { id } = useParams();
  const job = getJobById(id);
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) return <Navigate to="/careers" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook this up to your ATS / careers endpoint (e.g. POST /api/applications).
    setSubmitted(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'Careers', to: '/careers' }, { label: job.title }]} />
          <span className="eyebrow-line">{job.department}</span>
          <h1 style={{ maxWidth: 700 }}>{job.title}</h1>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <span className="badge-pl"><i className="bi bi-geo-alt me-1"></i>{job.location}</span>
            <span className="badge-pl">{job.type}</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-7">
              <h5 className="mb-3">About the role</h5>
              <p className="text-secondary">{job.description}</p>
              <h6 className="mt-4 mb-2">What we look for</h6>
              <ul className="text-secondary">
                <li className="mb-2">2+ years of relevant experience in {job.department.toLowerCase()}.</li>
                <li className="mb-2">Comfortable owning client-facing communication end to end.</li>
                <li className="mb-2">Based in or willing to relocate to Mumbai.</li>
              </ul>
            </div>

            <div className="col-lg-5">
              <div className="p-4 rounded-3" style={{ background: 'var(--paper-dim)' }}>
                {submitted ? (
                  <>
                    <h5 className="mb-2">Application received</h5>
                    <p className="text-secondary mb-0">
                      Thanks for applying to {job.title}. Our talent team will be in touch if
                      there's a fit.
                    </p>
                  </>
                ) : (
                  <form className="form-pl" onSubmit={handleSubmit}>
                    <h5 className="mb-3">Apply for this role</h5>
                    <div className="mb-3">
                      <label htmlFor="jd-name">Full name *</label>
                      <input id="jd-name" required className="form-control" type="text" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="jd-email">Email *</label>
                      <input id="jd-email" required className="form-control" type="email" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="jd-phone">Phone *</label>
                      <input id="jd-phone" required className="form-control" type="tel" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="jd-exp">Years of experience</label>
                      <input id="jd-exp" className="form-control" type="text" placeholder="e.g. 3 years" />
                    </div>
                    <div className="mb-3">
                      <label>Resume *</label>
                      <label className="upload-drop d-block mb-0">
                        <input type="file" required className="d-none" onChange={(e) => setFileName(e.target.files?.[0]?.name || '')} />
                        <i className="bi bi-cloud-arrow-up fs-3 d-block mb-2 text-secondary"></i>
                        <span className="small text-secondary">{fileName || 'Upload PDF or DOC (max 10MB)'}</span>
                      </label>
                    </div>
                    <button type="submit" className="btn-pl btn-pl-signal w-100 justify-content-center">
                      Submit Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
