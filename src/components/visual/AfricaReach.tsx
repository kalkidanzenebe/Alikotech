/**
 * Simplified Africa silhouette with a marker on Ethiopia and expanding rings.
 * Decorative only, the reach stages are described in adjacent text.
 */
const AfricaReach = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 400 460"
    className={className}
    fill="none"
  >
    <defs>
      <linearGradient id="africa-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(var(--accent) / 0.28)" />
        <stop offset="100%" stopColor="hsl(var(--accent) / 0.06)" />
      </linearGradient>
    </defs>

    {/* Continent silhouette (stylised) */}
    <path
      d="M126 24 L214 20 L246 40 L268 36 L286 58 L272 86 L286 112 L316 128 L330 158 L318 186 L332 214 L318 246 L286 258 L272 286 L246 300 L240 334 L222 366 L206 404 L186 436 L162 428 L156 396 L138 372 L128 334 L108 306 L92 268 L74 236 L58 200 L52 162 L64 128 L82 96 L96 62 Z"
      fill="url(#africa-fill)"
      stroke="hsl(var(--accent) / 0.5)"
      strokeWidth="1.5"
    />

    {/* Grid overlay for a data feel */}
    <g stroke="hsl(var(--accent) / 0.18)" strokeWidth="0.75">
      {[80, 140, 200, 260, 320, 380].map((y) => (
        <line key={y} x1="40" y1={y} x2="345" y2={y} />
      ))}
      {[90, 150, 210, 270, 330].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="440" />
      ))}
    </g>

    {/* Ethiopia marker */}
    <g>
      <circle cx="288" cy="196" r="34" fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="1" />
      <circle cx="288" cy="196" r="20" fill="none" stroke="hsl(var(--accent) / 0.5)" strokeWidth="1" />
      <circle cx="288" cy="196" r="7" fill="hsl(var(--accent))" />
    </g>

    {/* Outward connections */}
    <g stroke="hsl(var(--accent) / 0.55)" strokeWidth="1.25" className="flow-line">
      <path d="M288 196 L170 140" />
      <path d="M288 196 L150 300" />
      <path d="M288 196 L200 400" />
    </g>
  </svg>
);

export default AfricaReach;
