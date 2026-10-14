import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { verticals } from '../data/services';
import RelatedWorkEnquiry from '../components/RelatedworkEnquiry';

/* =====================================================
   1) YOUR IMAGES / VIDEOS   (files go in public/images/digital/)
   Leave a video as '' to use the image only (fastest).
   ===================================================== */
const HERO_IMG   = '/images/digital/hero.jpg';
const HERO_VIDEO = '';                         // e.g. '/videos/digital-hero.mp4'

const BAND_IMG   = '/images/digital/band.jpg';
const BAND_VIDEO = '';                         // e.g. '/videos/digital-band.mp4'

const panels = [
  { tab: 'Social Media',  slug: 'social-media-management', img: '/images/digital/social.jpg',      video: '' },
  { tab: 'Performance',   slug: 'performance-marketing',   img: '/images/digital/performance.jpg', video: '' },
  { tab: 'SEO',           slug: 'seo',                     img: '/images/digital/seo.jpg',         video: '' },
  { tab: 'Influencer',    slug: 'influencer-marketing',    img: '/images/digital/influencer.jpg',  video: '' },
];

const gallery = [
  { img: '/images/digital/work-1.jpg', label: 'Brand Launch' },
  { img: '/images/digital/work-2.jpg', label: 'Social Campaign' },
  { img: '/images/digital/work-3.jpg', label: 'Website Build' },
  { img: '/images/digital/work-4.jpg', label: 'Product Film' },
  { img: '/images/digital/work-5.jpg', label: 'Performance Push' },
  { img: '/images/digital/work-6.jpg', label: 'Creator Collab' },
];
/* service card images: /images/digital/services/<slug>.jpg  (e.g. seo.jpg) */

/* =====================================================
   2) SHORT CONTENT
   ===================================================== */
const stats = [
  { n: 14,  suffix: '+', label: 'Clients' },
  { n: 600, suffix: '+', label: 'Projects' },
  { n: 120, suffix: '+', label: 'People' },
  { n: 50,  suffix: '+', label: 'Reviews' },
];

const platforms = ['Instagram', 'Facebook', 'YouTube', 'LinkedIn', 'Google Ads', 'Meta Ads', 'SEO', 'Influencers'];

/* floating glass icons in the hero: d = how strongly they follow the mouse */
const floaters = [
  { icon: 'bi-instagram',  top: '18%', left: '8%',  size: 74, d: 26, delay: 0 },
  { icon: 'bi-facebook',   top: '46%', left: '4%',  size: 62, d: 18, delay: -2 },
  { icon: 'bi-youtube',    top: '70%', left: '14%', size: 70, d: 30, delay: -4 },
  { icon: 'bi-linkedin',   top: '30%', left: '26%', size: 56, d: 14, delay: -1 },
  { icon: 'bi-twitter-x',  top: '62%', left: '31%', size: 58, d: 22, delay: -3 },
  { icon: 'bi-google',     top: '12%', left: '38%', size: 52, d: 16, delay: -5 },
];

const iconBySlug = {
  'social-media-management': 'bi-chat-heart-fill',
  'performance-marketing': 'bi-graph-up-arrow',
  'seo': 'bi-search',
  'influencer-marketing': 'bi-stars',
  'video-commercial-production': 'bi-camera-video-fill',
  'website-development': 'bi-window-stack',
  'creative-design': 'bi-palette-fill',
  'cgi-digital-content': 'bi-box-fill',
};

const digital = verticals.digital;

/* image with a violet fallback so nothing looks broken before you add files */
const bg = (src) => ({
  backgroundImage: `url(${src}), radial-gradient(70% 70% at 30% 20%, #7a54a7, #322553 60%, #120d20)`,
});

/* =====================================================
   helpers
   ===================================================== */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`dm-reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const k = Math.min((t - t0) / 1400, 1);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* =====================================================
   PAGE
   ===================================================== */
export default function DigitalM() {
  const heroRef = useRef(null);
  const [active, setActive] = useState(0);

  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5) * 2);
    e.currentTarget.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5) * 2);
  };
    const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  /* hero zooms a little on scroll */
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = heroRef.current;
        if (!h) return;
        h.style.setProperty('--p', Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <main className="dm-page">
      {/* ===== 1. HERO ===== */}
      <section ref={heroRef} className="dm-hero" onMouseMove={onHeroMove}>
        <div className="dm-hero-bg" style={bg(HERO_IMG)}>
          {HERO_VIDEO && <video src={HERO_VIDEO} autoPlay muted loop playsInline preload="auto" />}
        </div>
        <div className="dm-hero-shade" />

        {floaters.map((f) => (
          <span key={f.icon} className="dm-float"
                style={{ top: f.top, left: f.left, width: f.size, height: f.size, '--d': f.d }}>
            <span className="dm-float-in" style={{ animationDelay: `${f.delay}s`, fontSize: f.size * 0.42 }}>
              <i className={`bi ${f.icon}`}></i>
            </span>
          </span>
        ))}

        <div className="dm-hero-inner">
          <h1 className="dm-title">
            <span>Digital</span>
            <span>Marketing</span>
          </h1>
          <div className="dm-rule"><i></i><b>Strategy · Content · Media · Growth</b><i></i></div>
          <div className="dm-hero-cta">
            <Link to="/contact" className="dm-btn">Start a project <i className="bi bi-arrow-up-right"></i></Link>
            <a href="#dm-services" className="enq-pill">Our services</a>
          </div>
        </div>

        {/* <a className="dm-scroll" href="#dm-strip" aria-label="Scroll down"><span></span></a> */}
      </section>

      {/* ===== 2. MOVING PLATFORMS + NUMBERS ===== */}
      {/* <section className="dm-strip" id="dm-strip">
        <div className="dm-marquee" aria-hidden="true">
          <div className="dm-marquee-track">
            {[...platforms, ...platforms].map((p, i) => <span key={i}>{p}<em>✦</em></span>)}
          </div>
        </div>

        <div className="dm-wide">
          <div className="dm-stats">
            {stats.map((s) => (
              <div className="dm-stat" key={s.label}>
                <strong><CountUp to={s.n} suffix={s.suffix} /></strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== 3. EXPANDING IMAGE / VIDEO PANELS ===== */}
      <section className="dm-block">
        <div className="dm-wide">
         <Reveal className="dm-label"><span className="enq-pill">What we do best</span></Reveal>

          <div className="dm-panels">
            {panels.map((p, i) => (
              <article key={p.tab}
                       className={`dm-pan ${i === active ? 'on' : ''}`}
                       style={bg(p.img)}
                       onMouseEnter={() => setActive(i)}
                       onClick={() => setActive(i)}>
                {/* the video plays only in the open panel, so the page stays light */}
                {p.video && i === active && <video src={p.video} autoPlay muted loop playsInline />}
                <div className="dm-pan-shade" />
                <span className="dm-pan-no">0{i + 1}</span>
                <h3 className="dm-pan-side">{p.tab}</h3>
                <div className="dm-pan-body">
                  <h3>{p.tab}</h3>
                  <Link to={`/services/${p.slug}`} className="dm-pan-go">
                    Explore <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. SERVICES (image cards with a short description, each opens its page) ===== */}
      <section className="dm-block" id="dm-services">
        <div className="dm-wide">
        <Reveal className="dm-label"><span className="enq-pill">Our services</span></Reveal>
    <div className="dm-grid">
      {digital.services.map((s, i) => (
        <Reveal key={s.slug} delay={(i % 4) * 80}>
          <Link to={`/services/${s.slug}`} className="dm-card" onMouseMove={handleMove}>
            <span className="dm-card-icon"><i className={`bi ${iconBySlug[s.slug]}`}></i></span>
            <h3>{s.name}</h3>
            <p>{s.summary}</p>
          </Link>
        </Reveal>
      ))}
        </div>
            </div>
      </section>

      {/* ===== 5. FULL-WIDTH VIDEO BAND ===== */}
      {/* <section className="dm-block dm-block--flush">
        <div className="dm-band" style={bg(BAND_IMG)}>
          {BAND_VIDEO && <video src={BAND_VIDEO} autoPlay muted loop playsInline preload="auto" />}
          <div className="dm-band-shade" />
          <Reveal className="dm-band-text">
            <h2>Your brand. <em>Everywhere it matters.</em></h2>
          </Reveal>
        </div>
      </section> */}

      {/* ===== 6. WORK GALLERY ===== */}
      <section className="dm-block">
        <div className="dm-wide">
         <h2 className="enq-pill section-pill-spacing">Selected work</h2>
          <div className="dm-gallery">
            {gallery.map((g, i) => (
              <Reveal key={g.label} className={`dm-g dm-g${i + 1}`} delay={(i % 3) * 90}>
                <div className="dm-g-img" style={bg(g.img)} />
                <span className="dm-g-label">{g.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RelatedWorkEnquiry />
    </main>
  );
}