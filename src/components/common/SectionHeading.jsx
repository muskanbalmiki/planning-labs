export default function SectionHeading({ kicker, title, subtitle, align = 'left', dark = false }) {
  return (
    <div className={`mb-5 ${align === 'center' ? 'text-center mx-auto' : ''}`} style={align === 'center' ? { maxWidth: 640 } : {}}>
      {kicker && <span className="kicker">{kicker}</span>}
      <h2 className="mb-3">{title}</h2>
      {subtitle && <p className={dark ? 'text-white-50' : 'text-secondary'} style={{ maxWidth: 560, fontSize: '1.05rem' }}>{subtitle}</p>}
    </div>
  );
}
