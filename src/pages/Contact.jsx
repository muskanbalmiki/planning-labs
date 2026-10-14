import { useRef, useState } from 'react';
import EnquiryForm from '../components/common/EnquiryForm';

const details = [
  {
    key: 'office',
    icon: 'bi-geo-alt',
    label: 'Office',
    lines: ['Planning Labs', 'Andheri East, Mumbai, Maharashtra 400069, India'],
    href: 'https://www.google.com/maps?q=Andheri%20East%2C%20Mumbai',
    action: 'Open in Maps',
    external: true,
  },
  {
    key: 'phone',
    icon: 'bi-telephone',
    label: 'Phone',
    lines: ['+91 22 0000 0000'],
    href: 'tel:+912200000000',
    copy: '+91 22 0000 0000',
  },
  {
    key: 'email',
    icon: 'bi-envelope',
    label: 'Email',
    lines: ['hello@planninglabs.in'],
    href: 'mailto:hello@planninglabs.in',
    copy: 'hello@planninglabs.in',
  },
  {
    key: 'whatsapp',
    icon: 'bi-whatsapp',
    label: 'WhatsApp',
    lines: ['Chat with us'],
    href: 'https://wa.me/912200000000',
    action: 'Start chat',
    external: true,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(null);
  const timer = useRef(null);

  // copy phone / email with one click and show "Copied" for a moment
  const copy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 1800);
    } catch (err) {
      /* clipboard blocked: the link still works */
    }
  };

  // glow in the hero follows the mouse
  const heroMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  // light follows the cursor on each card
  const spot = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div className="cp-page">
      {/* ================= hero ================= */}
      <header className="cp-hero" onMouseMove={heroMove}>
        <span className="cp-glow g1" aria-hidden="true" />
        <span className="cp-glow g2" aria-hidden="true" />
        <div className="container-pl cp-hero-inner">
          <span className="cp-pill">Get in touch</span>
          <h1 className="cp-title">Tell us what you're planning</h1>
          <p className="cp-lead">Share a few details and the right person on our team will get back to you.</p>
        </div>
      </header>

      {/* ================= details + form ================= */}
      <section className="cp-section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-5">
              <span className="cp-pill">Contact details</span>

              <div className="cp-list">
                {details.map((d) => (
                  <div key={d.key} className="cp-card" onMouseMove={spot}>
                    <span className="cp-icon"><i className={`bi ${d.icon}`}></i></span>

                    <div className="cp-body">
                      <span className="cp-label">{d.label}</span>
                      <a
                        href={d.href}
                        className="cp-value"
                        {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {d.lines.map((l, i) => (
                          <span key={i}>{l}</span>
                        ))}
                      </a>
                    </div>

                    {d.copy ? (
                      <button
                        type="button"
                        className={`cp-copy${copied === d.key ? ' is-done' : ''}`}
                        onClick={() => copy(d.key, d.copy)}
                        aria-label={`Copy ${d.label.toLowerCase()}`}
                      >
                        <i className={`bi ${copied === d.key ? 'bi-check-lg' : 'bi-copy'}`}></i>
                        <span>{copied === d.key ? 'Copied' : 'Copy'}</span>
                      </button>
                    ) : (
                      <a
                        href={d.href}
                        className="cp-copy"
                        target={d.external ? '_blank' : undefined}
                        rel={d.external ? 'noopener noreferrer' : undefined}
                        aria-label={d.action}
                      >
                        <i className="bi bi-arrow-up-right"></i>
                        <span>{d.action}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              <div className="cp-map">
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

            <div className="col-lg-7">
              <div className="cp-formcard">
                <span className="cp-pill">Send us a brief</span>
                <h2 className="cp-h2">Have a brief? Let's plan it.</h2>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}