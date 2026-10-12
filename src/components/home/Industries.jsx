import { industries } from '../../data/projects';

export default function Industries() {
  return (
    <section className="section industries-section">
      <div className="container-pl">
        <div className="ind-grid">
          {/* left: statement */}
          <div className="ind-left">
            <span className="ind-pill">Industries served</span>
            <h2 className="ind-title">
              <span>Built for brands</span>
              <span className="ind-soft">across industries.</span>
            </h2>
            <p className="ind-lede">
              From real estate to healthcare, we plan every campaign around how each category
              actually buys.
            </p>
          </div>

          {/* right: numbered list */}
          <ul className="ind-list">
            {industries.map((item, i) => {
              const label = typeof item === 'string' ? item : item.name;
              return (
                <li
                  key={i}
                  className="ind-row"
                  style={{ '--accent': i % 2 ? '#b89bdd' : '#ffc756' }}
                >
                  <span className="ind-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="ind-name">{label}</span>
                  <span className="ind-go">
                    <i className="bi bi-arrow-up-right"></i>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}