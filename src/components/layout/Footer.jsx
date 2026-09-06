import { Link } from 'react-router-dom';
import { verticals } from '../../data/services';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="pl-footer">
      <div className="container-pl">
        <div className="row g-4 pb-5">
          <div className="col-12 col-lg-4">
            <Link to="/" className="pl-logo d-inline-block mb-3">
              Planning<span>Labs</span>
            </Link>
            <p className="text-white-50" style={{ maxWidth: 320 }}>
              An experiential and digital marketing agency based in Mumbai, building
              brand experiences and growth systems across India.
            </p>
            <div className="d-flex gap-3 mt-4">
              {['instagram', 'linkedin', 'facebook', 'youtube'].map((s) => (
                <a key={s} href="#" aria-label={s} className="fs-5">
                  <i className={`bi bi-${s}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Experiential</h6>
            <div className="d-flex flex-column gap-2">
              {verticals.experiential.services.slice(0, 6).map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="small">{s.name}</Link>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Digital</h6>
            <div className="d-flex flex-column gap-2">
              {verticals.digital.services.slice(0, 6).map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="small">{s.name}</Link>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Company</h6>
            <div className="d-flex flex-column gap-2">
              <Link to="/about" className="small">About</Link>
              <Link to="/our-work" className="small">Our Work</Link>
              <Link to="/case-studies" className="small">Case Studies</Link>
              <Link to="/insights" className="small">Insights</Link>
              <Link to="/careers" className="small">Careers</Link>
              <Link to="/contact" className="small">Contact</Link>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Contact</h6>
            <div className="d-flex flex-column gap-2 small">
              <a href="tel:+912200000000"><i className="bi bi-telephone me-2"></i>+91 22 0000 0000</a>
              <a href="mailto:hello@planninglabs.in"><i className="bi bi-envelope me-2"></i>hello@planninglabs.in</a>
              <span className="text-white-50"><i className="bi bi-geo-alt me-2"></i>Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>

        <hr className="hr-line mb-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-white-50">
          <span>© {year} Planning Labs. All rights reserved.</span>
          <div className="d-flex gap-3">
            <Link to="/privacy-policy" className="text-white-50">Privacy Policy</Link>
            <Link to="/terms" className="text-white-50">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
