import { Link } from 'react-router-dom';
import { blogs } from '../../data/blogs';

// reads whichever field name your data uses
const imgOf = (b) => b.image || b.img || b.thumbnail || b.cover || '';
const titleOf = (b) => b.title || b.name || 'Untitled';
const textOf = (b) => b.excerpt || b.summary || b.description || '';
const catOf = (b) => b.category || b.tag || '';
const linkOf = (b) => `/insights/${b.slug || b.id}`;
const metaOf = (b) => [b.date, b.readTime || b.read_time].filter(Boolean).join('  ·  ');

export default function LatestInsights() {
  const [main, ...rest] = blogs.slice(0, 3);
  if (!main) return null;

  return (
    <section className="section insights-section">
      <div className="container-pl">
        {/* header */}
        <div className="in-head">
          <div>
            <span className="in-pill">Latest insights</span>
            <h2 className="in-title">Latest from Planning Labs</h2>
          </div>
          <Link to="/insights" className="in-btn">
            View all insights
            <span className="in-btn-icon"><i className="bi bi-arrow-right"></i></span>
          </Link>
        </div>

        <div className="in-grid">
          {/* big featured post */}
          <Link to={linkOf(main)} className="in-main">
            <span
              className="in-photo"
              style={imgOf(main) ? { backgroundImage: `url(${imgOf(main)})` } : undefined}
            />
            <span className="in-main-top">
              {catOf(main) && <span className="in-tag">{catOf(main)}</span>}
            </span>
            <span className="in-main-body">
              <span className="in-meta">{metaOf(main)}</span>
              <span className="in-main-title">{titleOf(main)}</span>
              {textOf(main) && <span className="in-main-text">{textOf(main)}</span>}
              <span className="in-read">
                Read article <i className="bi bi-arrow-up-right"></i>
              </span>
            </span>
          </Link>

          {/* two slim posts */}
          <div className="in-side">
            {rest.map((b, i) => (
              <Link
                key={b.id}
                to={linkOf(b)}
                className="in-small"
                style={{ '--accent': i % 2 ? '#ffc756' : '#b89bdd' }}
              >
                <span
                  className="in-thumb"
                  style={imgOf(b) ? { backgroundImage: `url(${imgOf(b)})` } : undefined}
                />
                <span className="in-small-body">
                  {catOf(b) && <span className="in-small-tag">{catOf(b)}</span>}
                  <span className="in-small-title">{titleOf(b)}</span>
                  <span className="in-meta">{metaOf(b)}</span>
                </span>
                <span className="in-go"><i className="bi bi-arrow-up-right"></i></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}