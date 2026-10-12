import { Link } from 'react-router-dom';

export default function ContactCTA() {
  return (
    <section className="section contact-section">
      <div className="container-pl">
        <div className="ct-card">
          <span className="ct-rings" aria-hidden="true"></span>

          <span className="ct-pill">Let's talk</span>

          <h2 className="ct-title">Have a brief? Let's plan it.</h2>

          <p className="ct-text">
            Tell us what you're building — a launch, a campaign, a full-year retainer —
            and we'll come back with a point of view within one business day.
          </p>

          <div className="ct-actions">
            <Link to="/contact" className="ct-btn">
              Send a brief
              <span className="ct-btn-icon">
                <i className="bi bi-arrow-up-right"></i>
              </span>
            </Link>

            <a href="tel:+912200000000" className="ct-phone">
              <i className="bi bi-telephone"></i> +91 22 0000 0000
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}