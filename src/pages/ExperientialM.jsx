import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { verticals } from '../data/services';   // <-- your services data file
import RelatedWorkEnquiry from '../components/RelatedworkEnquiry';

/* =====================================================
   YOUR VIDEOS (YouTube ids). Change them here only.
   ===================================================== */
const V1 = 'qog4U44-4YM';   // landscape video 1
const V2 = 'NxhU0mX3K84';   // landscape video 2
const S1 = 'n7EycMAP6cs';   // short (vertical) 1
const S2 = 'CEh8RRMmCxI';   // short (vertical) 2

const HERO_ID = V1;
const BAND_ID = V2;

const marquee = ['On-ground', 'Virtual', 'Hybrid', 'Exhibits', 'Brand Activations', 'MICE'];

const chapters = [
  { no: '01', title: 'Anticipate',    yt: V1, line: 'We build experiences before brands even know they need them.' },
  { no: '02', title: 'Set in motion', yt: V2, line: 'Concept, stage, stall and show-calling, all moving as one.' },
  { no: '03', title: 'On ground',     yt: V1, line: 'From the first sketch to the last light cue, under one roof.' },
];

const reels = [
  { title: 'Product Launch',     tag: 'Launch',     yt: S1 },
  { title: 'Retail Activation',  tag: 'Activation', yt: S2 },
  { title: 'Employee Town Hall', tag: 'Corporate',  yt: S1 },
  { title: 'Exhibition Stall',   tag: 'Exhibition', yt: S2 },
  { title: 'MICE Abroad',        tag: 'MICE',       yt: S1 },
];

/* ---------- SERVICES: now read from your data file ---------- */
const vertical = verticals.experiential;

/* your data file has no icons, so one icon per slug */
const iconBySlug = {
  'events': 'bi-calendar-event-fill',
  'exhibitions-stall-design': 'bi-shop',
  'brand-activations': 'bi-lightning-charge-fill',
  'mice': 'bi-people-fill',
  'conferences-product-launches': 'bi-mic-fill',
  'employee-engagement': 'bi-emoji-smile-fill',
  'outdoor-advertising': 'bi-signpost-split-fill',
  'event-production-fabrication': 'bi-tools',
};

/* ---------- YouTube player API loader (loads once) ---------- */
let ytPromise;
function loadYT() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (!ytPromise) {
    ytPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT); };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    });
  }
  return ytPromise;
}

/* ---------- background video that fills its box and plays itself ---------- */
function YTBg({ id, short = false, playerRef }) {
  const wrap = useRef(null);
  const host = useRef(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  /* start loading a little before it scrolls into view */
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '600px' });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return undefined;
    let player;
    let dead = false;
    let retry;
    let tries = 0;

    const kick = () => {
      try { if (player && player.playVideo) { player.mute(); player.playVideo(); } } catch (err) { /* ignore */ }
    };
    const events = ['pointermove', 'scroll', 'touchstart', 'keydown'];
    events.forEach((ev) => window.addEventListener(ev, kick, { once: true, passive: true }));

    loadYT().then((YT) => {
      if (dead || !host.current) return;
      const el = document.createElement('div');
      host.current.appendChild(el);
      player = new YT.Player(el, {
        videoId: id,
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, loop: 1, playlist: id,
          modestbranding: 1, rel: 0, playsinline: 1, iv_load_policy: 3, disablekb: 1, fs: 0,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
            if (playerRef) playerRef.current = e.target;
            retry = setInterval(() => {
              tries += 1;
              const st = e.target.getPlayerState ? e.target.getPlayerState() : -1;
              if (st === 1) clearInterval(retry);                       // playing
              else if (tries > 12) { clearInterval(retry); setReady(true); } // show anyway
              else kick();
            }, 500);
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) setReady(true);
            if (e.data === YT.PlayerState.ENDED) e.target.playVideo();
          },
        },
      });
    });

    return () => {
      dead = true;
      clearInterval(retry);
      events.forEach((ev) => window.removeEventListener(ev, kick));
      try { if (player && player.destroy) player.destroy(); } catch (err) { /* ignore */ }
      if (playerRef) playerRef.current = null;
      if (host.current) host.current.innerHTML = '';
      setReady(false);
    };
  }, [id, near]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={wrap} className={`yt-cover ${short ? 'is-short' : ''} ${ready ? 'is-ready' : ''}`}>
      <div ref={host} className="yt-host" />
    </div>
  );
}

export default function ExperientialM() {
  const heroRef = useRef(null);
  const heroPlayer = useRef(null);

  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [panel, setPanel] = useState(0);
  const [modal, setModal] = useState(null);

  /* curtain opens on load */
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 150);
    return () => clearTimeout(t);
  }, []);

  /* hero zooms a little on scroll */
  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = heroRef.current;
        if (!h) return;
        const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
        h.style.setProperty('--p', p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  /* Esc closes the pop-up */
  useEffect(() => {
    if (!modal) return undefined;
    const onKey = (e) => e.key === 'Escape' && setModal(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [modal]);

  const onHeroMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5) * 2);
    e.currentTarget.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const toggleSound = () => {
    const p = heroPlayer.current;
    if (!p) return;
    if (muted) { p.unMute(); p.setVolume(100); } else { p.mute(); }
    setMuted(!muted);
  };

  /* soft spotlight on the service cards */
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <main className="em-page">
      {/* ===== 1. FULL-SCREEN VIDEO OPENING ===== */}
      <section ref={heroRef} className={`xm-hero ${open ? 'is-open' : ''}`} onMouseMove={onHeroMove}>
        <div className="xm-stage">
          <YTBg id={HERO_ID} playerRef={heroPlayer} />
          <div className="xm-shade" />
          <div className="xm-dim" />
        </div>

        <div className="container-pl xm-top">
          {/* <nav className="em-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span>/</span> Experiential Marketing
          </nav> */}
        </div>

        <button className="xm-sound" onClick={toggleSound} aria-label="Toggle sound">
          <i className={`bi ${muted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'}`}></i>
        </button>
        <a className="xm-scroll" href="#xm-band" aria-label="Scroll down"><span></span></a>
      </section>

      {/* ===== 2. FULL-WIDTH STATEMENT BAND ===== */}
      <section className="xm-band" id="xm-band">
        <YTBg id={BAND_ID} />
        {/* <div className="xm-band-shade" />

        <div className="xm-marquee top" aria-hidden="true">
          <div className="xm-marquee-track">
            {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div> */}

        {/* <div className="xm-band-text">
          <span className="xm-chip">Experiential Marketing</span>
          <h2>We don’t just execute.<br /><em>We anticipate.</em></h2>
          <p>We didn’t follow trends. We set them in motion.</p>
        </div> */}

        {/* <div className="xm-marquee bottom" aria-hidden="true">
          <div className="xm-marquee-track">
            {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div> */}
      </section>

      {/* ===== 3. EXPANDING VIDEO PANELS ===== */}
      <section className="xm-block">
        <div className="xm-wide">
          <div className="xm-block-head">
            <span className="xm-chip">How we work</span>
            {/* <h2 className="xm-h">Three moves. <em>One team.</em></h2> */}
          </div>

          <div className="xm-panels">
            {chapters.map((c, i) => (
              <article
                key={c.no}
                className={`xm-pan ${i === panel ? 'on' : ''}`}
                onMouseEnter={() => setPanel(i)}
                onClick={() => setPanel(i)}
              >
                <YTBg id={c.yt} />
                <div className="xm-pan-shade" />
                <span className="xm-pan-no">{c.no}</span>
                <h3 className="xm-pan-side">{c.title}</h3>
                <div className="xm-pan-body">
                  <h3>{c.title}</h3>
                  <p>{c.line}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. REEL WALL (vertical shorts) ===== */}
      <section className="xm-block xm-block--wall">
        <div className="xm-wide">
          <div className="xm-block-head">
            {/* <span className="xm-chip">Reels</span> */}
            <span className="enq-pill">Watch us work</span>
          </div>

          <div className="xm-wall">
            {reels.map((r, i) => (
              <button key={i} className="xm-card" onClick={() => setModal(r)} aria-label={`Play ${r.title}`}>
                <YTBg id={r.yt} short />
                <div className="xm-card-shade" />
                <span className="xm-card-info">
                  <small>{r.tag}</small>
                  <b>{r.title}</b>
                </span>
                <span className="xm-card-play"><i className="bi bi-volume-up-fill"></i></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. SERVICES (every card opens its own page) ===== */}
      <section className="em-services">
        <div className="container-pl">
          <div className="em-services-head">
            <a href="#dm-services" className="enq-pill">Our services</a>
          </div>

          <div className="em-grid">
            {vertical.services.map((s) => (
              <Link
                to={`/services/${s.slug}`}
                className="em-card"
                key={s.slug}
                onMouseMove={handleMove}
              >
                <div className="em-card-top">
                  <i className={`bi ${iconBySlug[s.slug]}`}></i>
                  {/* <i className="bi bi-arrow-up-right em-card-go"></i> */}
                </div>
                <h3 className="h3-white">{s.name}</h3>
                <p>{s.summary}</p>
              </Link>
            ))}
          </div>

          {/* <div className="em-cta">
            <h2>Have an event in mind?</h2>
            <Link to="/contact" className="em-btn">
              Start a project <i className="bi bi-arrow-up-right"></i>
            </Link>
          </div> */}
        </div>
      </section>

      <RelatedWorkEnquiry />

      {/* ===== POP-UP PLAYER (with sound) ===== */}
      {modal && (
        <div className="xm-modal" onClick={() => setModal(null)}>
          <button className="xm-close" aria-label="Close"><i className="bi bi-x-lg"></i></button>
          <div className="xm-modal-box is-short" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${modal.yt}?autoplay=1&rel=0&playsinline=1`}
              title={modal.title}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}