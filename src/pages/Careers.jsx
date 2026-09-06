import { useState, useMemo } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import JobCard from '../components/common/JobCard';
import { jobs } from '../data/jobs';

const perks = [
  { icon: 'bi-lightbulb', title: 'Cross-discipline work', text: 'Move between experiential and digital briefs instead of sitting in one silo.' },
  { icon: 'bi-tools', title: 'In-house production', text: 'Fabrication, edit and media desks on-site — see your work built, not just briefed.' },
  { icon: 'bi-graph-up-arrow', title: 'Real ownership', text: 'Client-facing roles from early on, with senior support when you need it.' },
];

export default function Careers() {
  const [dept, setDept] = useState('All');
  const departments = ['All', ...new Set(jobs.map((j) => j.department))];

  const filtered = useMemo(
    () => (dept === 'All' ? jobs : jobs.filter((j) => j.department === dept)),
    [dept]
  );

  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'Careers' }]} />
          <span className="eyebrow-line">Join Planning Labs</span>
          <h1 style={{ maxWidth: 700 }}>Build brand moments for a living</h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row g-4">
            {perks.map((p, i) => (
              <div key={i} className="col-md-4">
                <i className={`bi ${p.icon} fs-2`} style={{ color: 'var(--signal)' }}></i>
                <h6 className="mt-3 mb-2">{p.title}</h6>
                <p className="small text-secondary">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-dim)' }}>
        <div className="container-pl">
          <div className="d-flex justify-content-between align-items-end flex-wrap mb-4">
            <h3 className="mb-3">Open roles ({filtered.length})</h3>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {departments.map((d) => (
                <button
                  key={d}
                  className={`filter-pill ${dept === d ? 'active' : ''}`}
                  onClick={() => setDept(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            {filtered.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
        </div>
      </section>
    </>
  );
}
