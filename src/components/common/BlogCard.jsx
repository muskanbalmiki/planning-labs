import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const date = new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <Link to={`/insights/${blog.id}`} className="card-pl d-block h-100 text-decoration-none">
      <div style={{ background: blog.cover, aspectRatio: '16/10' }} />
      <div className="p-4">
        <span className="badge-pl mb-3 d-inline-block">{blog.category}</span>
        <h5 className="mb-2">{blog.title}</h5>
        <p className="text-secondary small mb-3">{blog.excerpt}</p>
        <span className="small text-secondary">{date}</span>
      </div>
    </Link>
  );
}
