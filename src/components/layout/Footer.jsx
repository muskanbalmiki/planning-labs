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
            Don't hesitate to drop us a line if you need consultancy with your project. Our team will always be there to help you reach your goal by proposing the right choices.
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
              {/* <Link to="/contact" className="small">Contact</Link> */}
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6>Part of Swapnil Tambe</h6>
            <div className="d-flex flex-column gap-2 small">
              <a href="Saudi-event-expert" className="text-decoration-underline">Saudi Arabia Event Expert</a>
              <a href="dubai-event-solution" className="text-decoration-underline">Dubai Event Solution</a>
              <a href="swapnil-tambe-group" className="text-decoration-underline">Swapnil Tambe Group</a>
           
            </div>
          </div>
        </div>

        <hr className="hr-line mb-4" />

          <div className="row g-2 pb-5">
            <div className="col-12 col-lg-4">
            <h6>India :</h6>
            <p className="text-white-50" style={{ maxWidth: 320 }}>
            80.1/B, Ground & First Floor, Kamgar Nagar, Near BKC, Kurla East, MH INDIA 400024 
            Contact: +91 9967253567
            </p>
           
          </div>

         <div className="col-12 col-lg-4">
            <h6>UAE :</h6>
            <p className="text-white-50" style={{ maxWidth: 320 }}>
          80.1/B, Barsha Heights 1812, B-Tower, Al Shaib Tower Dubai, Al Barsha Heights, Tecom, United Arab Emirates
          Contact: +971 501234567
            </p>
           
          </div>

            <div className="col-12 col-lg-4">
            <h6>Canada :</h6>
            <p className="text-white-50" style={{ maxWidth: 320 }}>
            431B, 41st Avenue NE, Calgary, Canada Contact: +1 (778) 230-1144
            </p>
           
          </div>
          
          <div className="col-12 col-lg-4">
            <h6>Saudi Arabia :</h6>
            <p className="text-white-50" style={{ maxWidth: 320 }}>
           Jeddah ,2164 ,Sau Contact: +966 (0) 530877889
            </p>
           
          </div>
          

          </div>

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
