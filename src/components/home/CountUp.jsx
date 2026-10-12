import { useEffect, useState } from 'react';

export default function CountUp({ value, duration = 2000 }) {
  const match = String(value).match(/^([^\d]*)([\d,.]+)(.*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : 0;
  const suffix = match ? match[3] : '';

  const [n, setN] = useState(0);

  useEffect(() => {
    console.log('CountUp running for', value);
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setN(Math.round(target * t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return (
    <span>
      {prefix}{n}{suffix}
    </span>
  );
}