import { Link } from 'react-router-dom';
import RelatedWorkEnquiry from '../components/RelatedworkEnquiry';

const services = [
  { no: '01', icon: 'bi-calendar-event-fill', title: 'Events',
    text: 'End-to-end planning and live execution for corporate and consumer events of any size.' },
  { no: '02', icon: 'bi-shop', title: 'Exhibitions & Stall Design',
    text: 'Custom stall design and fabrication that turns floor space into footfall.' },
  { no: '03', icon: 'bi-lightning-charge-fill', title: 'Brand Activations',
    text: 'On-ground activations that convert audience attention into brand recall.' },
  { no: '04', icon: 'bi-people-fill', title: 'MICE',
    text: 'Meetings, incentives, conferences and exhibitions delivered end to end, in India and abroad.' },

  // 05 to 08: screenshot was cut off, replace with the real text
  { no: '05', icon: 'bi-mic-fill', title: 'Conferences & Product Launches',
    text: 'High-stakes launch moments, staged with precision from stage design to show-calling.' },
  { no: '06', icon: 'bi-emoji-smile-fill', title: 'Employee Engagement',
    text: 'Town halls, offsites and culture-building experiences that bring teams together.' },
  { no: '07', icon: 'bi-signpost-split-fill', title: 'Outdoor Advertising',
    text: 'OOH planning and buying across high-visibility locations to put your brand in front of the city.' },
  { no: '08', icon: 'bi-tools', title: 'Event Production & Fabrication',
    text: 'In-house fabrication, sound, light and AV, so every build is delivered under one roof.' },
];


export default function ExperientialM() {
  // same idea as the home panels: cursor position drives a soft spotlight
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <main className="em-page">
      <section className="em-hero">
        <div className="container-pl">
          <nav className="em-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span>/</span> Experiential Marketing
          </nav>

          <span className="em-eyebrow">Experiential Marketing</span>

          <h1 className="em-title">
            <span>We build moments people remember,</span>
            <span className="em-outline">and brands people trust.</span>
          </h1>

          <p className="em-intro">
            {/* From stage to stall, Planning Labs designs and produces live brand
            experiences across India — engineered for scale, safety and impact. */}
          </p>
        </div>
      </section>

      <section className="em-services">
        <div className="container-pl">
          <div className="em-grid">
            {services.map((s) => (
              <article className="em-card" key={s.no} onMouseMove={handleMove}>
                <div className="em-card-top">
                  {/* <span className="em-no">{s.no}</span> */}
                  <i className={`bi ${s.icon}`}></i>
                </div>
                <h3 className="h3-white">{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>

          <div className="em-cta">
            <h2>Have an event in mind?</h2>
            <Link to="/contact" className="em-btn">
              Start a project <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div>
        </div>
        
      </section>
      <RelatedWorkEnquiry />
    </main>
  );
}