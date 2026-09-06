export default function FloatingActions() {
  return (
    <>
      <a
        className="wa-float"
        href="https://wa.me/912200000000?text=Hi%20Planning%20Labs%2C%20I%27d%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
      <a className="call-float" href="tel:+912200000000" aria-label="Call Planning Labs">
        <i className="bi bi-telephone-fill"></i>
      </a>
    </>
  );
}
