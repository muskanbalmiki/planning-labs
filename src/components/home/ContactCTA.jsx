import { Link } from 'react-router-dom';

export default function ContactCTA() {
  return (
    <section className="section">
      <div className="container-pl">
        <div className="p-5 rounded-3 text-center" style={{ background: 'var(--ink)' }}>
          <h2 className="text-white mb-3">Have a brief? Let's plan it.</h2>
          <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: 480 }}>
            Tell us what you're building — a launch, a campaign, a full-year retainer —
            and we'll come back with a point of view within one business day.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/contact" className="btn-pl btn-pl-signal">Send a Brief</Link>
            <a href="tel:+912200000000" className="btn-pl btn-pl-outline-light">
              <i className="bi bi-telephone"></i> +91 22 0000 0000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
