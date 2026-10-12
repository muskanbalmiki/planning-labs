import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { stats } from '../../data/stats';
import CountUp from './CountUp';
import '../../styles/hero pl.css';

/* ---- easy settings: both services side by side on the front screen ---- */
const panels = [
  {
    key: 'experiential',
    line1: 'Experiential',
    line2: 'Marketing',
    to: '/experiential-marketing',
    cta: 'Explore services',
    image: '/images/hero-experiential.webp', // public/images/hero-experiential.webp
    video: null,                               // optional: '/videos/experiential.mp4' (replaces the image)
    focus: '35% center',                       // part of the picture kept in view when both are shown
    a1: '#ffc756',
    a2: '#ff9b17',
    on: '#2a1a05',
    tint: '#ffd9a0',
    glow1: 'rgba(255, 155, 23, 0.5)',
    glow2: 'rgba(255, 199, 86, 0.28)',
    bg: 'linear-gradient(160deg, rgba(255,155,23,0.42) 0%, rgba(8,6,15,0.78) 72%)',
  },
  {
    key: 'digital',
    line1: 'Digital',
    line2: 'Marketing',
    to: '/digital-marketing',
    cta: 'Explore services',
    image: '/images/hero-digital.png',       // public/images/hero-digital.webp
    video: null,                               // optional: '/videos/digital.mp4' (replaces the image)
    focus: '60% center',
    a1: '#b89bdd',
    a2: '#7a54a7',
    on: '#ffffff',
    tint: '#c9b8e6',
    glow1: 'rgba(122, 84, 167, 0.55)',
    glow2: 'rgba(59, 123, 255, 0.35)',
    bg: 'linear-gradient(160deg, rgba(122,84,167,0.55) 0%, rgba(8,6,15,0.78) 72%)',
  },
];

// floating particles: fixed values so they look the same on every render
const particles = Array.from({ length: 16 }, (_, i) => ({
  x: `${(i * 47 + 5) % 100}%`,
  size: `${2 + (i % 3)}px`,
  dur: `${10 + (i % 6) * 2}s`,
  delay: `${-(i * 1.9)}s`,
  tone: i % 3,
}));

export default function Hero() {
  // which side is opened: null = both equal, 0 = Experiential, 1 = Digital
  const [open, setOpen] = useState(null);

  // mouse position drives the parallax (CSS variables --px / --py)
  const handleMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const handleLeave = (e) => {
    e.currentTarget.style.setProperty('--px', 0);
    e.currentTarget.style.setProperty('--py', 0);
  };

  return (
    <section className="hero-pl">
      {/* both services on the first screen; hover a side and it slides open */}
      <div className="hero-split" onMouseLeave={() => setOpen(null)}>
        {panels.map((p, i) => (
          <Fragment key={p.key}>
            {/* partition in the middle (click the round handle to show both again) */}
            {i === 1 && (
              <div className="hero-divider">
                <span className="hero-divider-line" />
                <button
                  type="button"
                  className="hero-handle"
                  aria-label="Show both services"
                  onClick={() => setOpen(null)}
                >
                  <i className="bi bi-chevron-left"></i>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}

            <div
              className={`hero-half is-${p.key}${open === i ? ' is-open' : ''}${
                open !== null && open !== i ? ' is-shrunk' : ''
              }`}
              style={{
                '--a1': p.a1,
                '--a2': p.a2,
                '--a-solid': p.a1,
                '--a-on': p.on,
                '--tint': p.tint,
                '--glow1': p.glow1,
                '--glow2': p.glow2,
                '--panel-bg': p.bg,
              }}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              {/* artwork + motion */}
              <div className="hero-art" aria-hidden="true">
                <div className="hero-art-move">
                  {p.video ? (
                    <video className="hero-art-media" src={p.video} autoPlay muted loop playsInline />
                  ) : (
                    <img
                      className="hero-art-media is-zoom"
                      src={p.image}
                      alt=""
                      style={{ objectPosition: p.focus }}
                    />
                  )}
                </div>

                <span className="hero-glow g1" />
                <span className="hero-glow g2" />
                <span className="hero-sweep" />

                <span className="hero-particles">
                  {particles.map((d, k) => (
                    <b
                      key={k}
                      className={`hero-dot t${d.tone}`}
                      style={{ '--x': d.x, '--s': d.size, '--d': d.dur, '--dl': d.delay }}
                    />
                  ))}
                </span>

                <span className="hero-shade" />
              </div>

              {/* name + button, bottom-left on a dark fade so they are always readable */}
              <div className="hero-copy">
                <h2 className="hero-title">
                  <span>{p.line1}</span>
                  <span>{p.line2}</span>
                </h2>

                <Link to={p.to} className="hero-btn">
                  <span className="hero-btn-icon">
                    <i className="bi bi-arrow-right"></i>
                  </span>
                  {p.cta}
                </Link>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      {/* stats stay inside the container */}
      <div className="container-pl">
        <div className="hero-stat-strip">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <span className="stat-icon">
                <i className={`bi ${s.icon}`}></i>
              </span>
              <div className="stat-num">
                <CountUp value={s.value} />
              </div>
              <div className="stat-label">{s.label}</div>
              {s.note && <div className="stat-note">{s.note}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}