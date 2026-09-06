import { useState } from 'react';
import { allServices } from '../../data/services';

export default function EnquiryForm({ compact = false, defaultService = '' }) {
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFile = (e) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook this up to your CMS / CRM endpoint (e.g. POST /api/enquiries).
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-4 border rounded-3" style={{ borderColor: 'var(--line)' }}>
        <h5 className="mb-2">Thanks — your brief is in.</h5>
        <p className="text-secondary mb-0">
          A member of our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form className="form-pl" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="ef-name">Full name *</label>
          <input id="ef-name" required className="form-control" type="text" placeholder="Your name" />
        </div>
        <div className="col-md-6">
          <label htmlFor="ef-company">Company</label>
          <input id="ef-company" className="form-control" type="text" placeholder="Company name" />
        </div>
        <div className="col-md-6">
          <label htmlFor="ef-email">Email *</label>
          <input id="ef-email" required className="form-control" type="email" placeholder="you@company.com" />
        </div>
        <div className="col-md-6">
          <label htmlFor="ef-phone">Phone *</label>
          <input id="ef-phone" required className="form-control" type="tel" placeholder="+91 00000 00000" />
        </div>
        <div className="col-12">
          <label htmlFor="ef-service">I'm interested in</label>
          <select id="ef-service" className="form-select" defaultValue={defaultService}>
            <option value="">Select a service</option>
            {allServices.map((s) => (
              <option key={s.slug} value={s.slug}>{s.verticalName} — {s.name}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="ef-brief">Tell us about your project *</label>
          <textarea id="ef-brief" required className="form-control" rows={compact ? 3 : 5} placeholder="Timelines, budget range, goals — the more detail, the faster we can respond."></textarea>
        </div>
        <div className="col-12">
          <label>Attach a brief or reference file (optional)</label>
          <label className="upload-drop d-block mb-0">
            <input type="file" className="d-none" onChange={handleFile} />
            <i className="bi bi-cloud-arrow-up fs-3 d-block mb-2 text-secondary"></i>
            <span className="small text-secondary">
              {fileName ? fileName : 'Click to upload PDF, DOC or PPT (max 20MB)'}
            </span>
          </label>
        </div>
        <div className="col-12">
          <button type="submit" className="btn-pl btn-pl-signal w-100 w-md-auto justify-content-center">
            Send Enquiry
          </button>
        </div>
      </div>
    </form>
  );
}
