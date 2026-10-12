import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';

// reads whichever field name your data uses
const imgOf = (p) => p.image || p.img || p.thumbnail || p.cover || (p.images && p.images[0]) || '';
const titleOf = (p) => p.title || p.name || 'Project';
const catOf = (p) => p.category || p.vertical || p.type || '';
const clientOf = (p) => p.client || p.brand || '';
const linkOf = (p) => (p.slug ? `/our-work/${p.slug}` : '/our-work');

export default function FeaturedWork() {
  const track = useRef(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  useEffect(() => {
    updateProgress();
    window.addEventListener('resize', updateProgress);
    return () => window.removeEventListener('resize', updateProgress);
  }, []);

  /* ---- mouse drag (touch screens scroll natively) ---- */
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    drag.current = { down: true, startX: e.clientX, startLeft: track.current.scrollLeft, moved: false };
    setDragging(true);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    track.current.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
    setDragging(false);
  };
  /* a drag must not open the project it ended on */
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const nudge = (dir) =>
    track.current.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });

  return (
    <section className="section featured-work">
      <div className="container-pl">
        {/* header */}
        <div className="fw-head">
          <div>
            <span className="fw-pill">Selected work</span>
            <h2 className="fw-title">Recent projects across both disciplines</h2>
          </div>

          <div className="fw-tools">
            <span className="fw-hint">
              <i className="bi bi-hand-index-thumb"></i> Drag to explore
            </span>
            <button type="button" className="fw-arrow" aria-label="Previous projects" onClick={() => nudge(-1)}>
              <i className="bi bi-arrow-left"></i>
            </button>
            <button type="button" className="fw-arrow" aria-label="Next projects" onClick={() => nudge(1)}>
              <i className="bi bi-arrow-right"></i>
            </button>
            <Link to="/our-work" className="fw-btn">
              View full portfolio
              <span className="fw-btn-icon"><i className="bi bi-arrow-right"></i></span>
            </Link>
          </div>
        </div>

        {/* draggable row */}
          <div
            ref={track}
            className={`fw-track${dragging ? ' is-dragging' : ''}`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            onScroll={updateProgress}
          >
            {projects.map((p) => {
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
                    {clientOf(p) && <span className="fw-client">{clientOf(p)}</span>}
                  </span>

                  <span className="fw-go"><i className="bi bi-arrow-up-right"></i></span>
                </Link>
              );
            })}
          </div>

        {/* progress */}
        <div className="fw-progress" aria-hidden="true">
          <span style={{ width: `${12 + progress * 88}%` }} />
        </div>
      </div>
    </section>
  );
}