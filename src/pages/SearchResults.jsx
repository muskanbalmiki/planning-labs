import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { allServices } from '../data/services';
import { projects } from '../data/projects';
import { blogs } from '../data/blogs';
import { caseStudies } from '../data/caseStudies';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    const items = [];
    allServices.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)) {
        items.push({ type: 'Service', title: s.name, desc: s.summary, to: `/services/${s.slug}` });
      }
    });
    projects.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)) {
        items.push({ type: 'Project', title: p.title, desc: p.summary, to: `/our-work/${p.id}` });
      }
    });
    caseStudies.forEach((c) => {
      if (c.title.toLowerCase().includes(q)) {
        items.push({ type: 'Case Study', title: c.title, desc: c.challenge, to: `/case-studies/${c.id}` });
      }
    });
    blogs.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)) {
        items.push({ type: 'Insight', title: b.title, desc: b.excerpt, to: `/insights/${b.id}` });
      }
    });
    return items;
  }, [q]);

  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'Search' }]} />
          <h1>Results for "{params.get('q') || ''}"</h1>
          <p className="text-secondary mb-0">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>
      <section className="section">
        <div className="container-pl">
          {results.length === 0 ? (
            <p className="text-secondary">Nothing matched that search. Try a broader term, or browse <Link to="/our-work">Our Work</Link>.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {results.map((r, i) => (
                <Link key={i} to={r.to} className="card-pl d-block p-4 text-decoration-none">
                  <span className="badge-pl mb-2 d-inline-block">{r.type}</span>
                  <h6 className="mb-1">{r.title}</h6>
                  <p className="small text-secondary mb-0">{r.desc}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
