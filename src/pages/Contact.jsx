import Breadcrumb from '../components/common/Breadcrumb';
import EnquiryForm from '../components/common/EnquiryForm';

export default function Contact() {
  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <span className="eyebrow-line">Get in Touch</span>
          <h1 style={{ maxWidth: 700 }}>Tell us what you're planning</h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-4">
              <h5 className="mb-4">Contact details</h5>
              <div className="d-flex flex-column gap-4">
                <div>
                  <div className="small text-secondary mb-1">Office</div>
                  <p className="mb-0">Planning Labs<br />Andheri East, Mumbai, Maharashtra 400069, India</p>
                </div>
                <div>
                  <div className="small text-secondary mb-1">Phone</div>
                  <a href="tel:+912200000000">+91 22 0000 0000</a>
                </div>
                <div>
                  <div className="small text-secondary mb-1">Email</div>
                  <a href="mailto:hello@planninglabs.in">hello@planninglabs.in</a>
                </div>
                <div>
                  <div className="small text-secondary mb-1">WhatsApp</div>
                  <a href="https://wa.me/912200000000" target="_blank" rel="noopener noreferrer">
                    <i className="bi bi-whatsapp me-1"></i>Chat with us
                  </a>
                </div>
              </div>

              <div className="mt-5 rounded-3 overflow-hidden" style={{ border: '1px solid var(--line)' }}>
                <iframe
                  title="Planning Labs Office Map"
                  src="https://www.google.com/maps?q=Andheri%20East%2C%20Mumbai&output=embed"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="p-4 p-lg-5 rounded-3" style={{ background: 'var(--paper-dim)' }}>
                <h5 className="mb-4">Send us a brief</h5>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
