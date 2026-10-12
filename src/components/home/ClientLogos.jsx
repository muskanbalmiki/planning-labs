import { clients } from '../../data/stats';

function LogoRow({ items, reverse = false }) {
  // repeated so one group is always wider than the screen
  const group = [...items, ...items];
  return (
    <div className="logo-row">
      <div className={`logo-track${reverse ? ' is-reverse' : ''}`}>
        {[0, 1].map((g) => (
          <div className="logo-group" key={g} aria-hidden={g === 1}>
            {group.map((c, i) => (
              <div className="logo-item" key={`${c.name}-${i}`}>
                <img src={c.logo} alt={g === 0 ? c.name : ''} loading="lazy" draggable={false} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientLogos() {
  const half = Math.ceil(clients.length / 2);
  return (
    <section className="section client-section">
      <div className="container-pl">
        <div className="logo-head">
          <span className="logo-pill">Our clients</span>
          <h2 className="logo-title">Trusted by teams at</h2>
        </div>
      </div>

      <div className="logo-rows">
        <LogoRow items={clients.slice(0, half)} />
        <LogoRow items={clients.slice(half)} reverse />
      </div>
    </section>
  );
}