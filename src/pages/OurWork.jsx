import { useState, useMemo } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import ProjectCard from '../components/common/ProjectCard';
import { projects, industries } from '../data/projects';

const categoryFilters = [
  { key: 'all', label: 'All Work' },
  { key: 'experiential', label: 'Experiential' },
  { key: 'digital', label: 'Digital' },
];

export default function OurWork() {
  const [category, setCategory] = useState('all');
  const [industry, setIndustry] = useState('all');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const catOk = category === 'all' || p.category === category;
      const indOk = industry === 'all' || p.industry === industry;
      return catOk && indOk;
    });
  }, [category, industry]);

  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'Our Work' }]} />
          <span className="eyebrow-line">Portfolio</span>
          <h1 style={{ maxWidth: 700 }}>Work across experiential and digital, filtered your way</h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="d-flex flex-wrap gap-2 mb-4">
            {categoryFilters.map((f) => (
              <button
                key={f.key}
                className={`filter-pill ${category === f.key ? 'active' : ''}`}
                onClick={() => setCategory(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="d-flex flex-wrap gap-2 mb-5">
            <button
              className={`filter-pill ${industry === 'all' ? 'active' : ''}`}
              onClick={() => setIndustry('all')}
            >
              All Industries
            </button>
            {industries.map((ind) => (
              <button
                key={ind}
                className={`filter-pill ${industry === ind ? 'active' : ''}`}
                onClick={() => setIndustry(ind)}
              >
                {ind}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-secondary">No projects match these filters yet. Try a different combination.</p>
          ) : (
            <div className="row g-4">
              {filtered.map((p) => (
                <div key={p.id} className="col-md-6 col-lg-4">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
