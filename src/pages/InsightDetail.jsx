import { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogs } from '../data/blogs';

/* ---- same helpers as the Insights page / landing blog section ---- */
const imgOf = (b) => b.image || b.img || b.thumbnail || b.cover || '';
const titleOf = (b) => b.title || b.name || 'Untitled';
const textOf = (b) => b.excerpt || b.summary || b.description || '';
const catOf = (b) => b.category || b.tag || '';
const linkOf = (b) => `/insights/${b.slug || b.id}`;
const metaOf = (b) => [fmtDate(b.date), b.readTime || b.read_time].filter(Boolean).join('  ·  ');

/* cover can be a CSS gradient (like in blogs.js) or an image path/URL */
const bgOf = (b) => {
  const v = imgOf(b);
  if (!v) return undefined;
  return /gradient\(|^url\(/.test(v) ? v : `url(${v})`;
};
// 2026-07-09  ->  9 July 2026
const fmtDate = (d) => {
  if (!d) return '';
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? String(d) : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

/* article body: works with a string (paragraphs split by a blank line),
   an array of strings, or an array of { heading, text } objects.
   Change `bodyOf` if your article text lives in another field.            */
const bodyOf = (b) => b.content || b.body || b.text || b.article || '';
const toBlocks = (raw, fallback) => {
  const src = Array.isArray(raw) ? raw : String(raw || '').split(/\n{2,}/);
  const blocks = src
    .map((item) => {
      if (typeof item === 'string') return item.trim() ? { p: item.trim() } : null;
      if (item && typeof item === 'object') {
        return { h: item.heading || item.title, p: item.text || item.body || item.paragraph };
      }
      return null;
    })
    .filter(Boolean);
  return blocks.length ? blocks : fallback ? [{ p: fallback }] : [];
};

export default function InsightDetail() {
  const { slug } = useParams();
  const blog = blogs.find((b) => String(b.slug || b.id) === String(slug));

  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef(null);
  const timer = useRef(null);

  // reading progress bar: fills while the article is scrolled through
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-r.top + window.innerHeight * 0.3, 0), total);
      setProgress(total > 0 ? (done / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [slug]);

  // back to the top when another article is opened
  useEffect(() => window.scrollTo({ top: 0 }), [slug]);

  if (!blog) return <Navigate to="/insights" replace />;

  const digital = String(catOf(blog)).toLowerCase().includes('digital');
  const blocks = toBlocks(bodyOf(blog), textOf(blog));

  // related: same category first, then anything else
  const others = blogs.filter((b) => b.id !== blog.id);
  const sameCat = others.filter((b) => catOf(b) === catOf(blog));
  const related = [...sameCat, ...others.filter((b) => !sameCat.includes(b))].slice(0, 3);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      /* clipboard blocked: the share links still work */
    }
  };

  const img = imgOf(blog);

  return (
    <div className={`ind-page${digital ? ' is-digital' : ''}`}>
      {/* reading progress */}
      <div className="ind-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {/* ================= hero ================= */}
      <header className="ind-hero">
        <div
          className="ind-hero-bg"
          style={img ? { backgroundImage: bgOf(blog) } : undefined}
          aria-hidden="true"
        />
        <div className="container-pl ind-hero-inner">
          <Link to="/insights" className="ind-back">
            <i className="bi bi-arrow-left"></i> All insights
          </Link>
          {catOf(blog) && <span className="ind-tag">{catOf(blog)}</span>}
          <h1 className="ind-title">{titleOf(blog)}</h1>
          {metaOf(blog) && <p className="ind-meta">{metaOf(blog)}</p>}
        </div>
      </header>

      {/* ================= article ================= */}
      <section className="ind-section">
        <div className="container-pl">
          <div className="ind-layout">
            <article className="ind-article" ref={articleRef}>
              {textOf(blog) && blocks.length > 1 && <p className="ind-intro">{textOf(blog)}</p>}
              {blocks.map((b, i) => (
                <div key={i}>
                  {b.h && <h2 className="ind-h">{b.h}</h2>}
                  {b.p && <p className="ind-p">{b.p}</p>}
                </div>
              ))}
            </article>

            {/* share */}
            <aside className="ind-share">
              <span className="ind-share-label">Share</span>
              <button type="button" className={`ind-round${copied ? ' is-done' : ''}`} onClick={copyLink} aria-label="Copy link">
                <i className={`bi ${copied ? 'bi-check-lg' : 'bi-link-45deg'}`}></i>
              </button>
              <a
                className="ind-round"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                className="ind-round"
                href={`https://wa.me/?text=${encodeURIComponent(`${titleOf(blog)} ${url}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
              <span className="ind-copied" aria-live="polite">{copied ? 'Link copied' : ''}</span>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= more articles ================= */}
      {related.length > 0 && (
        <section className="ind-section ind-alt">
          <div className="container-pl">
            <div className="ind-head-row">
              <div>
                <span className="ind-pill">Keep reading</span>
                <h2 className="ind-h2">More from Planning Labs</h2>
              </div>
              <Link to="/insights" className="ind-link">
                View all insights <i className="bi bi-arrow-up-right"></i>
              </Link>
            </div>

            <div className="ind-related">
              {related.map((b, i) => (
                <Link
                  key={b.id}
                  to={linkOf(b)}
                  className="in-small"
                  style={{ '--accent': i % 2 ? '#ffc756' : '#b89bdd' }}
                >
                  <span
                    className="in-thumb"
                    style={bgOf(b) ? { backgroundImage: bgOf(b) } : undefined}
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
        </section>
      )}

      {/* ================= closing call to action ================= */}
      <section className="ind-section ind-last">
        <div className="container-pl">
          <div className="ind-cta">
            <div>
              <span className="ind-pill">Let's talk</span>
              <h2 className="ind-h2 mb-0">Have a brief? Let's plan it.</h2>
            </div>
            <Link to="/contact" className="ind-btn">
              <span className="ind-btn-icon"><i className="bi bi-arrow-right"></i></span>
              Send a brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}