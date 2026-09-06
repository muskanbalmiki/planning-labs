import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section text-center">
      <div className="container-pl">
        <span className="kicker">404</span>
        <h1 className="mb-3">This page hasn't been built yet.</h1>
        <p className="text-secondary mb-4">The page you're looking for doesn't exist or may have moved.</p>
        <Link to="/" className="btn-pl btn-pl-signal">Back to Home</Link>
      </div>
    </section>
  );
}
