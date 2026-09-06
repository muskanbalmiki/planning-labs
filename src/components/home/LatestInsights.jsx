import { Link } from 'react-router-dom';
import { blogs } from '../../data/blogs';
import BlogCard from '../common/BlogCard';
import SectionHeading from '../common/SectionHeading';

export default function LatestInsights() {
  const latest = blogs.slice(0, 3);
  return (
    <section className="section">
      <div className="container-pl">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-5">
          <SectionHeading kicker="Insights" title="Latest from Planning Labs" subtitle="" />
          <Link to="/insights" className="btn-pl btn-pl-outline-dark mb-5">
            View All Insights <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="row g-4">
          {latest.map((b) => (
            <div key={b.id} className="col-md-4">
              <BlogCard blog={b} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
