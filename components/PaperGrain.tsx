export default function PaperGrain() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-50 mix-blend-multiply"
      width="100%"
      height="100%"
    >
      <defs>
        <filter id="paperGrain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} result="n" />
          <feColorMatrix
            in="n"
            type="matrix"
            values="0 0 0 0 0.14  0 0 0 0 0.13  0 0 0 0 0.10  0 0 0 0.06 0"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#paperGrain)" />
    </svg>
  );
}
