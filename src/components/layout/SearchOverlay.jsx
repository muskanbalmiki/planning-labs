import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { allServices } from '../../data/services';
import { projects } from '../../data/projects';
import { blogs } from '../../data/blogs';
import { caseStudies } from '../../data/caseStudies';

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    const items = [];

    allServices.forEach((s) => {
      if (s.name.toLowerCase().includes(q)) {
        items.push({ type: 'Service', title: s.name, to: `/services/${s.slug}` });
      }
    });
    projects.forEach((p) => {
      if (p.title.toLowerCase().includes(q)) {
        items.push({ type: 'Project', title: p.title, to: `/our-work/${p.id}` });
      }
    });
    caseStudies.forEach((c) => {
      if (c.title.toLowerCase().includes(q)) {
        items.push({ type: 'Case Study', title: c.title, to: `/case-studies/${c.id}` });
      }
    });
    blogs.forEach((b) => {
      if (b.title.toLowerCase().includes(q)) {
        items.push({ type: 'Insight', title: b.title, to: `/insights/${b.id}` });
      }
    });
    return items.slice(0, 8);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div className="search-overlay" role="dialog" aria-modal="true">
      <div className="container-pl" style={{ maxWidth: 720 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="kicker" style={{ marginBottom: 0 }}>Search Planning Labs</span>
          <button
            className="btn btn-link text-white text-decoration-none fs-4 p-0"
            onClick={onClose}
            aria-label="Close search"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Search services, projects, insights…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <div className="mt-4">
          {results.map((r, i) => (
            <div
              key={i}
              className="search-result-item d-flex justify-content-between"
              role="button"
              onClick={() => { navigate(r.to); onClose(); }}
            >
              <span>{r.title}</span>
              <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{r.type}</span>
            </div>
          ))}
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="text-white-50 mt-3">No results for "{query}". Try a different term.</p>
          )}
        </div>
      </div>
    </div>
  );
}
