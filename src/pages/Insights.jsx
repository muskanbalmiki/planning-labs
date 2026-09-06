import { useState, useMemo } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import BlogCard from '../components/common/BlogCard';
import { blogs } from '../data/blogs';

const categories = ['All', 'Experiential', 'Digital'];

export default function Insights() {
  const [category, setCategory] = useState('All');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const catOk = category === 'All' || b.category === category;
      const qOk = q.trim() === '' || b.title.toLowerCase().includes(q.toLowerCase());
      return catOk && qOk;
    });
  }, [category, q]);

  return (
    <>
      <div className="page-hero">
        <div className="container-pl">
          <Breadcrumb items={[{ label: 'Insights' }]} />
          <span className="eyebrow-line">Insights & Blogs</span>
          <h1 style={{ maxWidth: 700 }}>Notes from the field — experiential and digital</h1>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="d-flex flex-wrap justify-content-between gap-3 mb-5">
            <div className="d-flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-pill ${category === c ? 'active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: 260, borderRadius: 3, borderColor: 'var(--line)' }}
              placeholder="Search articles…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <p className="text-secondary">No articles match your search.</p>
          ) : (
            <div className="row g-4">
              {filtered.map((b) => (
                <div key={b.id} className="col-md-4">
                  <BlogCard blog={b} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
