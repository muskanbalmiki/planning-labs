import { Link } from 'react-router-dom';

export default function DigitalM() {
  return (
    <section className="container py-5" style={{ minHeight: '70vh' }}>
      <Link to="/" className="d-inline-flex align-items-center gap-2 mb-4 text-decoration-none">
        <i className="bi bi-arrow-left"></i> Back to home
      </Link>
      <h1>Digital Marketing</h1>
    </section>
  );
}