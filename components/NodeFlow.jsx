// Signature element — the node-line motif from the brand: always tracing a
// real connection (account -> audience, purchase -> member, AI suggestion -> action).
export default function NodeFlow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 130 L120 60 L200 90 L300 30 L380 50" className="node-line" strokeLinecap="round" />
      <circle cx="20" cy="130" r="5" className="node-dot" />
      <circle cx="120" cy="60" r="4" fill="#0A5CFF" />
      <circle cx="200" cy="90" r="5" className="node-dot" />
      <circle cx="300" cy="30" r="4" fill="#FF4D8D" />
      <circle cx="380" cy="50" r="5" className="node-dot" />
    </svg>
  );
}
