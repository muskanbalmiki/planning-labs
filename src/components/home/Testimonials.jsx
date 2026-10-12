import { useEffect, useRef } from 'react';
import { testimonials } from '../../data/testimonials';
import SectionHeading from '../common/SectionHeading';

const initials = (name = '') =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function Testimonials() {
  const gridRef = useRef(null);

  // fade cards in as they scroll into view
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.tc-card');
    if (!cards) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="section section-dark">
      <div className="container-pl">
         <div className="sh-block">
  <span className="sh-kicker">Client Voices</span>

  <h2 className="sh-title">
     What our clients say
  </h2>
</div>
       

        <div className="row g-4 tc-grid" ref={gridRef}>
          {testimonials.map((t, i) => (
            <div key={t.id} className="col-md-6">
              <article
                className="tc-card"
                style={{ '--delay': `${i * 0.12}s` }}
                onMouseMove={handleMove}
              >
                <span className="tc-spot" />
                <span className="tc-line" />
                {/* <span className="tc-num">{String(i + 1).padStart(2, '0')}</span> */}

                <i className="bi bi-quote tc-quote"></i>
                <p className="tc-text">{t.quote}</p>

                <div className="tc-person">
                  <span className="tc-avatar">{initials(t.name)}</span>
                  <div>
                    <div className="tc-name">{t.name}</div>
                    <div className="tc-role">{t.role}</div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}