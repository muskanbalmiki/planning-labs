import { stats } from '../../data/stats';
import CountUp from './CountUp';
const stats = [
  { icon: 'bi-calendar-check', value: '14+', label: 'Happy Clients' },
  { icon: 'bi-box-seam', value: '600+', label: 'Projects done' },
  { icon: 'bi-people', value: '120+', label: 'Expert People' },
  { icon: 'bi-geo-alt', value: '30+', label: 'Reviews' },
];

export default function Stats() {
  return (
    <div className="container-pl">
      <div className="row g-0 border-top">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="col-6 col-md-3 py-4 px-4"
            style={{ borderLeft: i === 0 ? 'none' : '1px solid var(--line, #dcdad4)' }}
          >
            <i
              className={`bi ${s.icon}`}
              style={{ fontSize: 28, color: '#dfa811', display: 'block', marginBottom: 12 }}
            ></i>
            <div
              style={{
                fontFamily: 'poppins',
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1,
                color: '#dfa811',
              }}
            >
                          <CountUp value={s.value} />
            </div>
            <div className="mt-2 text-secondary">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
<stats/>