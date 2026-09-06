import { clients } from '../../data/stats';

export default function ClientLogos() {
  return (
    <section className="section pt-0">
      <div className="container-pl">
        <hr className="hr-line mb-5" />
        <p className="kicker text-center mb-4" style={{ color: 'var(--slate)' }}>Trusted by teams at</p>
        <div className="logo-strip d-flex flex-wrap justify-content-center gap-5">
          {clients.map((c, i) => (
            <span key={i} className="logo-name">{c}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
