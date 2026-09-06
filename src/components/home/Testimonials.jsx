import { testimonials } from '../../data/testimonials';
import SectionHeading from '../common/SectionHeading';

export default function Testimonials() {
  return (
    <section className="section section-dark">
      <div className="container-pl">
        <SectionHeading kicker="Client Voices" title="What our clients say" dark />
        <div className="row g-4">
          {testimonials.map((t) => (
            <div key={t.id} className="col-md-6">
              <div className="testimonial-card">
                <span className="quote-mark">&ldquo;</span>
                <p className="text-white-50 mb-4">{t.quote}</p>
                <div className="fw-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>{t.name}</div>
                <div className="small text-white-50">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
