import { Link } from 'react-router-dom';

const roles = ['Production', 'Strategy', 'Design', 'Media planning'];

export default function CareersPreview() {
  return (
    <section className="section careers-section">
      <div className="container-pl">
        <div
          className="cr-banner"
          style={{ '--photo': "url('/images/careers.jpg')" }}
        >
          <div className="cr-copy">
            <span className="cr-live">
              <i></i> We're hiring
            </span>

            <h2 className="cr-title">Build brand moments for a living.</h2>

            <p className="cr-text">
              We're hiring across production, strategy, design and media planning.
              If you'd rather build things than talk about building things, we should talk.
            </p>

            <div className="cr-roles">
              {roles.map((r) => (
                <Link key={r} to="/careers" className="cr-role">
                  {r}
                </Link>
              ))}
            </div>
          </div>

          <div className="cr-action">
            <Link to="/careers" className="cr-cta">
              View open roles
              <span className="cr-cta-icon">
                <i className="bi bi-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}