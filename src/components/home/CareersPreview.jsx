import { Link } from 'react-router-dom';

export default function CareersPreview() {
  return (
    <section className="section section-current">
      <div className="container-pl">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="kicker" style={{ color: '#5fd6c9' }}>Careers</span>
            <h2 className="text-white mb-3">Build brand moments for a living.</h2>
            <p className="text-white-50 mb-0" style={{ maxWidth: 520 }}>
              We're hiring across production, strategy, design and media planning.
              If you'd rather build things than talk about building things, we should talk.
            </p>
          </div>
          <div className="col-lg-5 text-lg-end">
            <Link to="/careers" className="btn-pl btn-pl-outline-light">
              View Open Roles <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
