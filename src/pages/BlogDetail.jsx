import { useParams, Link, Navigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import BlogCard from '../components/common/BlogCard';
import { getBlogById, blogs } from '../data/blogs';

export default function BlogDetail() {
  const { id } = useParams();
  const blog = getBlogById(id);
  if (!blog) return <Navigate to="/insights" replace />;

  const date = new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const more = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <>
      <div style={{ background: blog.cover, minHeight: 320 }} className="d-flex align-items-end">
        <div className="container-pl pb-5 pt-5">
          <Breadcrumb items={[{ label: 'Insights', to: '/insights' }, { label: blog.title }]} />
          <span className="badge-pl bg-white mb-3 d-inline-block">{blog.category}</span>
          <h1 className="text-white" style={{ maxWidth: 720 }}>{blog.title}</h1>
          <p className="text-white-50 mt-2 mb-0">{date}</p>
        </div>
      </div>

      <section className="section">
        <div className="container-pl">
          <div className="row">
            <div className="col-lg-8" style={{ fontSize: '1.05rem' }}>
              <p className="text-secondary">{blog.excerpt}</p>
              <p className="text-secondary">
                This article is part of our ongoing series on {blog.category.toLowerCase()} marketing
                practice at Planning Labs. Connect this piece to your CMS to pull in the full body
                copy, author byline and related tags for each post.
              </p>
              <p className="text-secondary">
                Want this turned into a working editorial workflow? The CMS layer for this section
                supports rich text, author profiles, categories/tags, and scheduled publishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-dim)' }}>
        <div className="container-pl">
          <h4 className="mb-4">More insights</h4>
          <div className="row g-4">
            {more.map((b) => (
              <div key={b.id} className="col-md-4">
                <BlogCard blog={b} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
