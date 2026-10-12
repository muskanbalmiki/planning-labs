import { Link } from 'react-router-dom';
import { verticals } from '../../data/services';

// same palette as the hero; each card gets a photo with a colour tint on top
const themes = [
  {
    accent: '#ffc756',
    on: '#2a1a05',
    icon: 'bi-megaphone-fill',
    photo: '/images/services/experiential.jpg',
    tint: 'rgba(255, 155, 23, 0.55)',
    blurb:
      'Creating meaningful brand experiences through events, activations, exhibitions and immersive experiences.',
  },
  {
    accent: '#b89bdd',
    on: '#1a1024',
    icon: 'bi-graph-up-arrow',
    photo: '/images/services/digital.jpg',
    tint: 'rgba(122, 84, 167, 0.65)',
    blurb:
      'Building digital experiences and campaigns that connect brands with the audiences that matter.',
  },
];

export default function ServiceOverview() {
  return (
    <section className="section services-section">
      <div className="container-pl">
        {/* header */}
        <div className="sv-intro">
          <div>
            <span className="sv-pill">What we do</span>
            <h2 className="sv-heading">
              Two disciplines. <span className="sv-grad">One accountable team.</span>
            </h2>
          </div>
          
        </div>

        {/* cards */}
        <div className="sv-wrap">
          {Object.values(verticals).map((v, i) => {
            const t = themes[i % themes.length];
            return (
              <article
                key={v.slug}
                className="sv-pane"
                style={{
                  '--accent': t.accent,
                  '--on': t.on,
                  '--bg': `linear-gradient(160deg, ${t.tint} 0%, rgba(8,6,15,0.88) 78%), url('${t.photo}') center / cover no-repeat, #08060f`,
                }}
              >
                <div className="sv-body">
                  <div className="sv-head">
                    <span className="sv-icon">
                      <i className={`bi ${t.icon}`}></i>
                    </span>
                    {/* <span className="sv-count">{v.services.length} services</span> */}
                  </div>

                  <h3 className="sv-title">{v.name}</h3>
                  <p className="sv-blurb">{v.description || t.blurb}</p>

                  <ul className="sv-list">
                    {v.services.slice(0, 4).map((s, n) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`}>
                          <em>{String(n + 1).padStart(2, '0')}</em>
                          <span>{s.name}</span>
                          <b><i className="bi bi-send"></i></b>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link to={`/services/${v.slug}`} className="sv-cta">
                    Explore {v.name} <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}