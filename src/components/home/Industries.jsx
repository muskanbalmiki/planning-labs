import { industries } from '../../data/projects';
import SectionHeading from '../common/SectionHeading';

export default function Industries() {
  return (
    <section className="section">
      <div className="container-pl">
        <SectionHeading
          kicker="Industries Served"
          title="Category expertise across sectors"
          subtitle="We've run experiential and digital programmes for brands across these categories, each with its own compliance, audience and sales-cycle nuances."
        />
        <div className="row g-3">
          {industries.map((ind, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className="p-3 border rounded-3 h-100 d-flex align-items-center gap-2" style={{ borderColor: 'var(--line)' }}>
                <span className="divider-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="fw-semibold" style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{ind}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
