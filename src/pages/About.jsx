import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import SectionHeading from '../components/common/SectionHeading';
import { stats } from '../data/stats';

const timeline = [
  { year: '2011', text: 'Planning Labs founded in Mumbai as a boutique event production house.' },
  { year: '2015', text: 'Launched in-house fabrication and stage engineering capability.' },
  { year: '2018', text: 'Added a digital marketing practice to serve full-funnel client briefs.' },
  { year: '2021', text: 'Crossed 400 delivered projects across experiential and digital.' },
  { year: '2025', text: 'Now a 90-person team running both disciplines under one roof.' },
];

const values = [
  { title: 'Accountable by default', text: 'Every engagement has one team lead across both disciplines — no hand-offs, no dropped context.' },
  { title: 'Built in-house', text: 'Fabrication, editing and media buying sit inside our building, not with a rotating bench of vendors.' },
  { title: 'Measured, not guessed', text: 'Every project closes with numbers — footfall, cost-per-lead, organic growth — reported the same way it was promised.' },
];

export default function About() {
  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'About' }]} />
          <span className="eyebrow-line">Since 2011 · Mumbai</span>
          <h1 style={{ maxWidth: 760 }}>
            An agency built by people who'd rather ship the work than talk about it.
          </h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-5">
            <div className="col-lg-7">
              <p style={{ fontSize: '1.1rem' }} className="text-secondary">
                Planning Labs started as a small event production team working out of
                Mumbai and grew into a full-service agency running two disciplines —
                experiential marketing and digital marketing — for brands who need
                both a stage and a screen to move at the same pace.
              </p>
              <p className="text-secondary">
                We don't run these as separate departments that occasionally talk to
                each other. Every client has one accountable team spanning both, so a
                launch event and its digital amplification are planned together from
                day one, not stitched together after the fact.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="row g-3">
                {stats.map((s, i) => (
                  <div key={i} className="col-6">
                    <div className="p-4 border rounded-3" style={{ borderColor: 'var(--line)' }}>
                      <div className="stat-num">{s.value}</div>
                      <div className="small text-secondary">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-dim)' }}>
        <div className="container-pl">
          <SectionHeading kicker="How We Work" title="What we hold ourselves to" />
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-md-4">
                <span className="divider-num">{String(i + 1).padStart(2, '0')}</span>
                <h5 className="mt-2 mb-2">{v.title}</h5>
                <p className="text-secondary small">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-pl">
          <SectionHeading kicker="Our Story" title="14 years, in short" />
          <div style={{ maxWidth: 640 }}>
            {timeline.map((t, i) => (
              <div key={i} className="timeline-item">
                <span className="divider-num">{t.year}</span>
                <p className="mb-0 mt-1">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container-pl text-center">
          <h2 className="text-white mb-3">Want to see how we work up close?</h2>
          <Link to="/our-work" className="btn-pl btn-pl-signal">Browse Our Work</Link>
        </div>
      </section>
    </>
  );
}
