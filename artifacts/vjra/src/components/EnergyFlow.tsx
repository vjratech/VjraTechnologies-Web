export function EnergyFlow() {
  return (
    <svg
      className="w-full h-full absolute inset-0 pointer-events-none"
      viewBox="0 0 1000 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
          <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Energy flow paths */}
      <path
        d="M 100 400 Q 300 200 500 400 T 900 400"
        stroke="url(#gradient1)"
        strokeWidth="2"
        strokeDasharray="10 10"
        className="animate-energy-flow"
      />
      <path
        d="M 200 600 Q 400 400 600 600 T 800 600"
        stroke="url(#gradient2)"
        strokeWidth="2"
        strokeDasharray="10 10"
        className="animate-energy-flow"
        style={{ animationDelay: '1s' }}
      />
      <path
        d="M 50 200 Q 250 100 450 200 T 950 200"
        stroke="url(#gradient1)"
        strokeWidth="1.5"
        strokeDasharray="8 8"
        className="animate-energy-flow"
        style={{ animationDelay: '2s' }}
      />
      
      {/* Glowing nodes */}
      <circle cx="500" cy="400" r="4" fill="#00f0ff" className="animate-pulse-glow" />
      <circle cx="600" cy="600" r="3" fill="#a855f7" className="animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
      <circle cx="450" cy="200" r="3" fill="#fbbf24" className="animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
    </svg>
  );
}
