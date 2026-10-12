import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* ---------- data (replace with your own imports if you have them) ---------- */
const fallbackProjects = [
  { id: 'skyline-realty', title: 'Skyline Realty — Launch Pavilion', service: 'Exhibitions & Stall Design', industry: 'Real Estate', year: 2025, cover: 'linear-gradient(160deg,#ff9b17,#08060f)' },
  { id: 'nova-bank', title: 'Nova Bank — Employee Town Hall', service: 'Employee Engagement', industry: 'BFSI', year: 2025, cover: 'linear-gradient(160deg,#7a54a7,#08060f)' },
  { id: 'verdant-foods', title: 'Verdant Foods — Retail Activation', service: 'Brand Activations', industry: 'FMCG', year: 2024, cover: 'linear-gradient(160deg,#ffc756,#08060f)' },
  { id: 'autodrive', title: 'AutoDrive Expo — Booth Experience', service: 'Exhibitions & Stall Design', industry: 'Automotive', year: 2024, cover: 'linear-gradient(160deg,#322553,#ff9b17)' },
];

const interests = [
  'Experiential Marketing — Events',
  'Experiential Marketing — Exhibitions & Stall Design',
  'Experiential Marketing — Brand Activations',
  'Experiential Marketing — MICE',
  'Digital Marketing — Social Media',
  'Digital Marketing — Performance Marketing',
  'Digital Marketing — SEO',
  'Digital Marketing — Influencer Marketing',
];

const MAX_MB = 20;

/* ---------- related work ---------- */
function RelatedWork({ projects }) {
  return (
    <section className="rw-section">
      <div className="container-pl">
        <div className="rw-head">
          <div>
            <span className="rw-kicker">Related work</span>
            <h2 className="rw-title">Similar projects we've delivered</h2>
          </div>
          <Link to="/our-work" className="rw-all">
            View all
            <span className="rw-all-icon"><i className="bi bi-arrow-right"></i></span>
          </Link>
        </div>

        {/* <div className="rw-grid">
          {projects.slice(0, 4).map((p) => (
            <Link key={p.id} to={`/our-work/${p.id}`} className="rw-card">
              <div
                className="rw-thumb"
                style={{ backgroundImage: p.image ? `url(${p.image})` : p.cover }}
              />
              <div className="rw-info">
                <span className="rw-pill">{p.service}</span>
                <h5>{p.title}</h5>
                <p>{p.industry} · {p.year}</p>
              </div>
            </Link>
          ))}
        </div> */}
        <div className="rw-grid">
  {projects.slice(0, 4).map((p) => {
    const digital = /digital|social|seo|performance|influencer/i.test(p.service || '');
    return (
      <Link
        key={p.id}
        to={`/our-work/${p.id}`}
        draggable={false}
        className="fw-card"
        style={{
          '--accent': digital ? '#b89bdd' : '#ffc756',
          '--on': digital ? '#1a1024' : '#2a1a05',
          '--tint': digital ? 'rgba(122,84,167,0.62)' : 'rgba(255,155,23,0.5)',
        }}
      >
        <span
          className="fw-photo"
          style={{ backgroundImage: p.image ? `url(${p.image})` : p.cover }}
        />

        <span className="fw-top">
          <span className="fw-tag">{p.service}</span>
          {p.year && <span className="fw-year">{p.year}</span>}
        </span>

        <span className="fw-bottom">
          <span className="fw-name">{p.title}</span>
          <span className="fw-client">{p.industry}</span>
        </span>

        <span className="fw-go"><i className="bi bi-arrow-up-right"></i></span>
      </Link>
    );
  })}
</div>

        
      </div>
    </section>
  );
}

/* ---------- enquiry form ---------- */
function EnquiryForm() {
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', interest: interests[0], message: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: '' });
  };

  const pickFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) {
      setErrors({ ...errors, file: `File is larger than ${MAX_MB}MB` });
      e.target.value = '';
      return;
    }
    setErrors({ ...errors, file: '' });
    setFile(f);
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email';
    if (form.phone.replace(/\D/g, '').length < 10) err.phone = 'Enter a valid phone number';
    if (form.message.trim().length < 10) err.message = 'Tell us a little more about your project';
    return err;
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    setStatus('sending');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (file) data.append('file', file);

      // send to your own API / form service here:
      // await fetch('/api/enquiry', { method: 'POST', body: data });
      await new Promise((r) => setTimeout(r, 900)); // demo delay, remove when the API is connected

      setStatus('sent');
      setForm({ name: '', company: '', email: '', phone: '', interest: interests[0], message: '' });
      setFile(null);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="enq-section">
      <div className="container-pl enq-grid">
        {/* left: heading */}
        <div className="enq-left">
          <span className="enq-pill">Get started</span>
          <h2 className="enq-title">
            Send us your <span className="enq-grad">Experiential marketing</span> brief
          </h2>
          <p className="enq-note">
            We'll respond within one business day with next steps and, where useful,
            a relevant case study.
          </p>
        </div>

        {/* right: form */}
        <form className="enq-form" onSubmit={submit} noValidate>
          {status === 'sent' ? (
            <div className="enq-success">
              <i className="bi bi-check-circle-fill"></i>
              <h4>Thanks, your brief is in</h4>
              <p>We'll get back to you within one business day.</p>
              <button type="button" className="enq-link" onClick={() => setStatus('idle')}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <div className="enq-row">
                <label className="enq-field">
                  <span>Full name *</span>
                  <input value={form.name} onChange={set('name')} placeholder="Your name" />
                  {errors.name && <em>{errors.name}</em>}
                </label>
                <label className="enq-field">
                  <span>Company</span>
                  <input value={form.company} onChange={set('company')} placeholder="Company name" />
                </label>
              </div>

              <div className="enq-row">
                <label className="enq-field">
                  <span>Email *</span>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" />
                  {errors.email && <em>{errors.email}</em>}
                </label>
                <label className="enq-field">
                  <span>Phone *</span>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+91 00000 00000" />
                  {errors.phone && <em>{errors.phone}</em>}
                </label>
              </div>

              <label className="enq-field">
                <span>I'm interested in</span>
                <select value={form.interest} onChange={set('interest')}>
                  {interests.map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>

              <label className="enq-field">
                <span>Tell us about your project *</span>
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Timelines, budget range, goals. The more detail, the faster we can respond."
                />
                {errors.message && <em>{errors.message}</em>}
              </label>

              <div className="enq-field">
                <span>Attach a brief or reference file (optional)</span>
                <button type="button" className="enq-drop" onClick={() => fileRef.current.click()}>
                  <i className={`bi ${file ? 'bi-file-earmark-check' : 'bi-cloud-arrow-up'}`}></i>
                  {file ? file.name : `Click to upload PDF, DOC or PPT (max ${MAX_MB}MB)`}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={pickFile}
                />
                {errors.file && <em>{errors.file}</em>}
              </div>

              {status === 'error' && (
                <p className="enq-error">Something went wrong. Please try again.</p>
              )}

              <button type="submit" className="enq-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                <span><i className="bi bi-arrow-right"></i></span>
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ---------- page ---------- */
export default function RelatedWorkEnquiry({ projects = fallbackProjects }) {
  return (
    <>
      <RelatedWork projects={projects} />
      <EnquiryForm />
    </>
  );
}