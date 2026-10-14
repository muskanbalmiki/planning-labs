import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import EnquiryForm from '../components/common/EnquiryForm';
import { getServiceBySlug } from '../data/services';
import { projects } from '../data/projects';

const processSteps = [
  { title: 'Brief & discovery', text: 'We align on objective, audience and constraints before any concept work starts.' },
  { title: 'Concept & planning', text: 'Strategy, creative direction and a detailed project plan, shared for sign-off.' },
  { title: 'Production & execution', text: 'In-house production teams build and deliver, with weekly checkpoints.' },
  { title: 'Measurement & report', text: 'A closing report against the metrics we agreed on at the brief stage.' },
];

// gold for experiential, violet for digital (same colours as the hero panels)
const accents = {
  signal: { a1: '#ffc756', a2: '#ff9b17', on: '#2a1a05', glow: 'rgba(255, 155, 23, 0.38)', glow2: 'rgba(122, 84, 167, 0.35)' },
  current: { a1: '#b89bdd', a2: '#7a54a7', on: '#ffffff', glow: 'rgba(122, 84, 167, 0.5)', glow2: 'rgba(59, 123, 255, 0.28)' },
};

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* ---- project card helpers (same idea as the featured work section) ----
   If your projects data uses other field names, change them here.        */
const catOf = (p) => p.category || p.service || '';
const imgOf = (p) => p.image || p.img || p.cover || p.thumbnail || '';
const titleOf = (p) => p.title || p.name || '';
const linkOf = (p) => `/work/${p.slug || p.id}`; // use your real project page route

export default function ServiceDetail() {
  const { slug } = useParams();
  const result = getServiceBySlug(slug);

  const [step, setStep] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const heroRef = useRef(null);
  const enquireRef = useRef(null);
  const rowRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: false });

  // reset the process tabs when the person opens another service
  useEffect(() => setStep(0), [slug]);

  // floating "Start a project" bar: visible only between the hero and the enquiry form
  useEffect(() => {
    const hero = heroRef.current;
    const enq = enquireRef.current;
    if (!hero || !enq) return undefined;
    const seen = { hero: true, enq: false };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) seen.hero = e.isIntersecting;
        else seen.enq = e.isIntersecting;
      });
      setShowBar(!seen.hero && !seen.enq);
    });
    io.observe(hero);
    io.observe(enq);
    return () => io.disconnect();
  }, [slug]);

  if (!result) return <Navigate to="/" replace />;
  const { vertical, ...service } = result;
  const isSignal = vertical.accent === 'signal';
  const a = isSignal ? accents.signal : accents.current;
  const vars = { '--sd-a1': a.a1, '--sd-a2': a.a2, '--sd-on': a.on, '--sd-glow': a.glow, '--sd-glow2': a.glow2 };

  const related = projects.filter((p) => p.service === service.name).slice(0, 6);
  const shown = related.length
    ? related
    : projects.filter((p) => p.category === (isSignal ? 'experiential' : 'digital')).slice(0, 6);
  const others = vertical.services.filter((s) => s.slug !== service.slug);

  /* ---- hero: glow follows the mouse ---- */
  const heroMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const heroLeave = (e) => {
    e.currentTarget.style.setProperty('--px', 0);
    e.currentTarget.style.setProperty('--py', 0);
  };

  /* ---- cards: light follows the cursor ---- */
  const spot = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  /* ---- process tabs: arrow keys move between steps ---- */
  const tabKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setStep((s) => (s + 1) % processSteps.length);
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setStep((s) => (s - 1 + processSteps.length) % processSteps.length);
  };

  /* ---- related projects: click-and-drag row ---- */
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return; // touch uses normal swipe scrolling
    drag.current = { down: true, startX: e.clientX, scroll: rowRef.current.scrollLeft, moved: false };
    rowRef.current.classList.add('is-dragging');
  };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    rowRef.current.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    rowRef.current?.classList.remove('is-dragging');
  };
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };
  const nudge = (dir) => rowRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });

  const active = processSteps[step];

  return (
    <div className="sd-page" style={vars}>
      {/* ================= hero ================= */}
      <header className="sd-hero" ref={heroRef} onMouseMove={heroMove} onMouseLeave={heroLeave}>
        <span className="sd-glow g1" aria-hidden="true" />
        <span className="sd-glow g2" aria-hidden="true" />
        <div className="container-pl sd-hero-inner">
          {/* <Breadcrumb items={[{ label: vertical.name, to: `/services/${vertical.slug}` }, { label: service.name }]} /> */}
          <span className="sd-pill">{vertical.name}</span>
          <h1 className="sd-title">{service.name}</h1>
          <p className="sd-lead">{service.summary}</p>

          <div className="sd-actions">
            <button type="button" className="sd-btn" onClick={() => goTo('sd-enquire')}>
              <span className="sd-btn-icon"><i className="bi bi-arrow-right"></i></span>
              Start a project
            </button>
            <button type="button" className="sd-btn sd-btn-ghost" onClick={() => goTo('sd-approach')}>
              See how we work
            </button>
          </div>
        </div>
      </header>

      {/* ================= approach: clickable steps ================= */}
      <section className="sd-section" id="sd-approach">
        <div className="container-pl">
          <span className="sd-pill">Our approach</span>
          <h2 className="sd-h2">How we approach {service.name.toLowerCase()}</h2>
          <p className="sd-text sd-intro">
            Our {service.name.toLowerCase()} work sits inside the broader {vertical.name.toLowerCase()}
            {' '}practice, backed by in-house production, design and measurement teams so nothing
            depends on an external vendor's timeline.
          </p>

          <div className="sd-process">
            <div className="sd-tabs" role="tablist" aria-label="Our process" onKeyDown={tabKey}>
              {processSteps.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  role="tab"
                  id={`sd-tab-${i}`}
                  aria-selected={step === i}
                  aria-controls="sd-panel"
                  tabIndex={step === i ? 0 : -1}
                  className={`sd-tab${step === i ? ' is-active' : ''}${i < step ? ' is-done' : ''}`}
                  onClick={() => setStep(i)}
                  onMouseEnter={() => setStep(i)}
                >
                  <span className="sd-tab-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sd-tab-name">{p.title}</span>
                </button>
              ))}
            </div>

            <div className="sd-panel sd-card" id="sd-panel" role="tabpanel" aria-labelledby={`sd-tab-${step}`}>
              <div className="sd-progress" aria-hidden="true">
                <span style={{ width: `${((step + 1) / processSteps.length) * 100}%` }} />
              </div>
              <div className="sd-panel-body" key={step}>
                <span className="sd-panel-big" aria-hidden="true">{String(step + 1).padStart(2, '0')}</span>
                <h3 className="sd-panel-title">{active.title}</h3>
                <p className="sd-panel-text">{active.text}</p>
              </div>
              <div className="sd-panel-nav">
                <button type="button" className="sd-round" aria-label="Previous step" disabled={step === 0} onClick={() => setStep(step - 1)}>
                  <i className="bi bi-arrow-left"></i>
                </button>
                <span className="sd-count">Step {step + 1} of {processSteps.length}</span>
                <button type="button" className="sd-round" aria-label="Next step" disabled={step === processSteps.length - 1} onClick={() => setStep(step + 1)}>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= other services ================= */}


      {/* ================= related projects: drag row (featured work cards) ================= */}
      {shown.length > 0 && (
        <section className="sd-section sd-section-alt">
          <div className="container-pl">
            <div className="sd-head-row">
              <div>
                <span className="sd-pill">Related work</span>
                <h2 className="sd-h2 mb-0">Projects like this</h2>
              </div>
              <div className="sd-arrows">
                <button type="button" className="sd-round" aria-label="Scroll left" onClick={() => nudge(-1)}>
                  <i className="bi bi-arrow-left"></i>
                </button>
                <button type="button" className="sd-round" aria-label="Scroll right" onClick={() => nudge(1)}>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>

          <div
            className="sd-row"
            ref={rowRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerLeave={onUp}
            onClickCapture={onClickCapture}
          >
            {shown.map((p) => {
              const digital = String(catOf(p)).toLowerCase().includes('digital');
              const img = imgOf(p);
              return (
                <Link
                  key={p.id}
                  to={linkOf(p)}
                  draggable={false}
                  className="fw-card"
                  style={{
                    '--accent': digital ? '#b89bdd' : '#ffc756',
                    '--on': digital ? '#1a1024' : '#2a1a05',
                    '--tint': digital ? 'rgba(122,84,167,0.62)' : 'rgba(255,155,23,0.5)',
                  }}
                >
                  <span className="fw-photo" style={img ? { backgroundImage: `url(${img})` } : undefined} />

                  <span className="fw-top">
                    {catOf(p) && <span className="fw-tag">{catOf(p)}</span>}
                    {p.year && <span className="fw-year">{p.year}</span>}
                  </span>

                  <span className="fw-bottom">
                    <span className="fw-name">{titleOf(p)}</span>
                  </span>

                  <span className="fw-go"><i className="bi bi-arrow-up-right"></i></span>
                </Link>
              );
            })}
          </div>
          {/* <p className="container-pl sd-hint">Drag to see more</p> */}
        </section>
      )}

      {/* ================= enquiry ================= */}
      <section className="sd-section" id="sd-enquire" ref={enquireRef}>
        <div className="container-pl">
          <div className="sd-cta">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6">
                <span className="sd-pill">Enquire</span>
                <h2 className="sd-h2">Ready to talk {service.name.toLowerCase()}?</h2>
                <p className="sd-text mb-0">
                  Share a few details and the right specialist on our team will follow up directly.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="sd-form">
                  <EnquiryForm defaultService={service.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* floating shortcut to the form */}
      {/* <button
        type="button"
        className={`sd-float${showBar ? ' is-on' : ''}`}
        onClick={() => goTo('sd-enquire')}
        tabIndex={showBar ? 0 : -1}
        aria-hidden={!showBar}
      >
        <span className="sd-btn-icon"><i className="bi bi-chat-dots"></i></span>
        Start a project
      </button> */}
    </div>
  );
}