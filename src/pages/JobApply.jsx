import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { jobs } from '../data/jobs';

const titleOf = (job) =>
  job.title || job.role || job.name || 'Open role';

const deptOf = (job) => job.department || '';
const locOf = (job) => job.location || '';

const typeOf = (job) =>
  job.type || job.employmentType || '';

const expOf = (job) =>
  job.experience || job.exp || '';

const descriptionOf = (job) =>
  job.description || job.about || job.summary || '';

const listOf = (value) =>
  Array.isArray(value)
    ? value.filter(
        (item) => typeof item === 'string' && item.trim()
      )
    : [];

const MAX_RESUME_SIZE = 10 * 1024 * 1024;
const RESUME_EXTENSION = /\.(pdf|doc|docx)$/i;

// Implement this endpoint on your backend.
// It must accept multipart/form-data and return:
// { success: true }
// ONLY after the application has actually been accepted.
const APPLICATION_ENDPOINT = '/api/applications';

function ApplicationForm({ job }) {
  const [resume, setResume] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [status, setStatus] = useState('idle');

  const isSubmitting = status === 'submitting';

  const handleResumeChange = (event) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    setResume(null);
    setFileError('');
    setSubmitError('');
    setStatus('idle');

    if (!file) return;

    if (!RESUME_EXTENSION.test(file.name)) {
      input.value = '';
      setFileError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    if (file.size === 0 || file.size > MAX_RESUME_SIZE) {
      input.value = '';
      setFileError(
        'Please upload a non-empty resume no larger than 10 MB.'
      );
      return;
    }

    setResume(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;

    setSubmitError('');
    setFileError('');

    if (!form.reportValidity()) return;

    if (!resume) {
      setFileError('Please upload your resume.');
      return;
    }

    const formData = new FormData(form);

    // Add job information to the submitted application.
    formData.set('jobId', String(job.id));
    formData.set('jobTitle', titleOf(job));
    formData.set('resume', resume);

    setStatus('submitting');

    try {
      const response = await fetch(APPLICATION_ENDPOINT, {
        method: 'POST',
        body: formData,
        // Do not manually set Content-Type for FormData.
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        throw new Error(
          'Your application could not be submitted. Please try again.'
        );
      }

      form.reset();
      setResume(null);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your application. Please try again.'
      );
    }
  };

  return (
    <aside
      className="car-apply-card"
      aria-labelledby="car-apply-title"
    >
      <h2 id="car-apply-title" className="car-apply-heading">
        Apply for this role
      </h2>

      <p className="car-apply-intro">
        Tell us about yourself and upload your resume.
        Required fields are marked with *.
      </p>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        aria-busy={isSubmitting}
      >
        <fieldset
          className="car-form-fields"
          disabled={isSubmitting}
        >
          <legend className="car-sr-only">
            Applicant details
          </legend>

          <div className="car-field">
            <label htmlFor="car-full-name">Full name *</label>
            <input
              id="car-full-name"
              name="fullName"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              maxLength={120}
              required
            />
          </div>

          <div className="car-field">
            <label htmlFor="car-email">Email *</label>
            <input
              id="car-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              maxLength={254}
              required
            />
          </div>

          <div className="car-field">
            <label htmlFor="car-phone">Phone *</label>
            <input
              id="car-phone"
              name="phone"
              type="tel"
              placeholder="Your phone number"
              autoComplete="tel"
              maxLength={30}
              required
            />
          </div>

          <div className="car-field">
            <label htmlFor="car-experience">
              Years of experience
            </label>
            <input
              id="car-experience"
              name="experience"
              type="number"
              placeholder="e.g. 3"
              min="0"
              max="80"
              step="0.5"
            />
          </div>

          <div className="car-field">
            <label htmlFor="car-resume">Resume *</label>

            <div className="car-upload">
              <input
                id="car-resume"
                className="car-upload-input"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                aria-describedby={
                  fileError
                    ? 'car-resume-help car-resume-error'
                    : 'car-resume-help'
                }
                aria-invalid={fileError ? true : undefined}
                required
              />

              <i
                className="bi bi-cloud-arrow-up"
                aria-hidden="true"
              ></i>

              <span className="car-upload-name">
                {resume ? resume.name : 'Choose your resume'}
              </span>

              <span
                id="car-resume-help"
                className="car-upload-help"
              >
                PDF, DOC, or DOCX — maximum 10 MB
              </span>
            </div>

            {fileError && (
              <p
                id="car-resume-error"
                className="car-form-message"
                role="alert"
              >
                {fileError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="car-btn car-submit"
            disabled={isSubmitting}
          >
            <span className="car-btn-icon">
              <i
                className={`bi ${
                  isSubmitting
                    ? 'bi-hourglass-split'
                    : 'bi-arrow-up-right'
                }`}
                aria-hidden="true"
              ></i>
            </span>

            {isSubmitting
              ? 'Submitting…'
              : 'Submit application'}
          </button>
        </fieldset>

        {submitError && (
          <p className="car-form-message" role="alert">
            {submitError}
          </p>
        )}

        {status === 'success' && (
          <p className="car-form-message" role="status">
            Your application has been submitted successfully.
            Thank you for applying!
          </p>
        )}
      </form>
    </aside>
  );
}

export default function JobApply() {
  const { id } = useParams();

  const job = jobs.find(
    (item) => String(item.id) === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!job) {
    return (
      <main className="car-page car-detail-page">
        <section className="car-hero">
          <div className="container-pl">
            <span className="car-pill">Careers</span>
            <h1 className="car-title">Role not found</h1>
            <p className="car-lead">
              This role may no longer be available.
              Please explore our current openings.
            </p>

            <Link to="/careers" className="car-btn">
              <span className="car-btn-icon">
                <i
                  className="bi bi-arrow-left"
                  aria-hidden="true"
                ></i>
              </span>
              Back to careers
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const meta = [
    locOf(job),
    typeOf(job),
    expOf(job),
  ].filter(Boolean);

  const responsibilities = listOf(job.responsibilities);

  const requirements = listOf(
    job.requirements || job.qualifications
  );

  const description = descriptionOf(job);

  return (
    <main className="car-page car-detail-page">
      <header className="car-hero car-detail-hero">
        <span
          className="car-glow g1"
          aria-hidden="true"
        />
        <span
          className="car-glow g2"
          aria-hidden="true"
        />

        <div className="container-pl car-hero-inner">
          <nav
            className="car-breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/careers">Careers</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{titleOf(job)}</span>
          </nav>

          {deptOf(job) && (
            <span className="car-pill">
              {deptOf(job)}
            </span>
          )}

          <h1 className="car-title">{titleOf(job)}</h1>

          {meta.length > 0 && (
            <div className="car-detail-meta">
              {meta.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="car-detail-badge"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className="car-section car-alt">
        <div className="container-pl">
          <div className="car-detail-grid">
            <article className="car-role-details">
              <section className="car-detail-block">
                <h2 className="car-detail-heading">
                  About the role
                </h2>

                <p className="car-detail-copy">
                  {description ||
                    'More details about this role will be shared during the hiring process.'}
                </p>
              </section>

              {responsibilities.length > 0 && (
                <section className="car-detail-block">
                  <h2 className="car-detail-heading">
                    What you’ll do
                  </h2>

                  <ul className="car-detail-list">
                    {responsibilities.map((item, index) => (
                      <li key={`${job.id}-task-${index}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {requirements.length > 0 && (
                <section className="car-detail-block">
                  <h2 className="car-detail-heading">
                    What we look for
                  </h2>

                  <ul className="car-detail-list">
                    {requirements.map((item, index) => (
                      <li key={`${job.id}-requirement-${index}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <Link
                to="/careers"
                className="car-back-link"
              >
                <i
                  className="bi bi-arrow-left"
                  aria-hidden="true"
                ></i>
                Back to all roles
              </Link>
            </article>

            <ApplicationForm
              key={String(job.id)}
              job={job}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
