import { useState } from "react";
import { AFRICA_MAP_PATHS } from "./africaMapData";
import { useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

interface AfricaReachProps {
  className?: string;
}

/**
 * Authentic Geographic Vector Map of Africa with real GIS boundaries,
 * realistic coastlines, Madagascar, and Ethiopia highlighted as the flagship hub.
 */
const AfricaReach = ({ className = "" }: AfricaReachProps) => {
  const reduced = useReducedMotion();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Addis Ababa / Ethiopia approximate centroid on this Robinson projection
  const hubX = 760;
  const hubY = 380;

  return (
    <div className={`relative flex flex-col justify-between rounded-2xl border border-accent/25 bg-card/60 p-4 backdrop-blur-md shadow-[var(--shadow-lift)] sm:p-5 ${className}`}>
      {/* Top Map Header / Indicator */}
      <div className="mb-3 flex w-full items-center justify-between border-b border-border/70 pb-2.5 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-bold text-foreground">
            {hoveredCountry ? (
              <span className="text-accent">{hoveredCountry}</span>
            ) : (
              <span>Ethiopia <span className="text-muted-foreground font-normal">(Flagship Hub)</span></span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
          <MapPin size={11} className="text-accent" />
          <span>9.03° N, 38.74° E</span>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[280px] py-1">
        <svg
          viewBox="40 0 940 1000"
          className="h-full w-full max-h-[420px] object-contain select-none"
          fill="none"
          role="img"
          aria-label="Geographic map of Africa highlighting Ethiopia"
        >
          <defs>
            {/* Ethiopia glow gradient */}
            <linearGradient id="ethiopia-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.85" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            </linearGradient>

            {/* Standard country subtle fill */}
            <linearGradient id="continent-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent) / 0.12)" />
              <stop offset="100%" stopColor="hsl(var(--accent) / 0.04)" />
            </linearGradient>

            {/* Radial glow around Ethiopia */}
            <radialGradient id="hub-radial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.45" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Blueprint Grid Overlay */}
          <g stroke="hsl(var(--accent) / 0.09)" strokeWidth="0.75" strokeDasharray="3 3">
            {[150, 300, 450, 600, 750, 900].map((y) => (
              <line key={`lat-${y}`} x1="50" y1={y} x2="930" y2={y} />
            ))}
            {[180, 330, 480, 630, 780].map((x) => (
              <line key={`lon-${x}`} x1={x} y1="30" x2={x} y2="970" />
            ))}
          </g>

          {/* Outer glow aura behind Ethiopia */}
          <circle cx={hubX} cy={hubY} r="130" fill="url(#hub-radial)" />

          {/* All African Countries - Authentic GIS Boundaries */}
          <g>
            {AFRICA_MAP_PATHS.map((country) => {
              const isEthiopia = country.id === "ET";
              const isHovered = hoveredCountry === country.name;

              return (
                <path
                  key={country.id}
                  d={country.d}
                  fill={
                    isEthiopia
                      ? "url(#ethiopia-glow)"
                      : isHovered
                      ? "hsl(var(--accent) / 0.35)"
                      : "url(#continent-fill)"
                  }
                  stroke={
                    isEthiopia
                      ? "hsl(var(--accent))"
                      : isHovered
                      ? "hsl(var(--accent) / 0.7)"
                      : "hsl(var(--accent) / 0.22)"
                  }
                  strokeWidth={isEthiopia ? 2.5 : isHovered ? 1.5 : 0.85}
                  strokeLinejoin="round"
                  className="transition-colors duration-200 cursor-pointer outline-none"
                  onMouseEnter={() => setHoveredCountry(country.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <title>{country.name}</title>
                </path>
              );
            })}
          </g>

          {/* Expansion Flow Vectors radiating from Ethiopia */}
          <g stroke="hsl(var(--accent) / 0.65)" strokeWidth="1.75" className="flow-line">
            {/* Towards East Africa / Kenya */}
            <path d={`M ${hubX} ${hubY} Q 780 460 760 520`} strokeDasharray="4 3" />
            {/* Towards West Africa */}
            <path d={`M ${hubX} ${hubY} Q 580 340 440 390`} strokeDasharray="4 3" />
            {/* Towards Southern Africa */}
            <path d={`M ${hubX} ${hubY} Q 700 620 600 860`} strokeDasharray="4 3" />
            {/* Towards North Africa */}
            <path d={`M ${hubX} ${hubY} Q 720 250 680 160`} strokeDasharray="4 3" />
          </g>

          {/* Destination Expansion Nodes */}
          {[
            { cx: 760, cy: 520, r: 4 },
            { cx: 440, cy: 390, r: 4 },
            { cx: 600, cy: 860, r: 4 },
            { cx: 680, cy: 160, r: 4 },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill="hsl(var(--accent) / 0.7)"
              stroke="hsl(var(--background))"
              strokeWidth="1.5"
            />
          ))}

          {/* Ethiopia Radar Pulses & Beacon */}
          <g pointerEvents="none">
            {/* Outer concentric pulse rings */}
            <circle
              cx={hubX}
              cy={hubY}
              r="68"
              fill="none"
              stroke="hsl(var(--accent) / 0.25)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
              style={reduced ? undefined : { animation: "spin 30s linear infinite" }}
            />
            <circle
              cx={hubX}
              cy={hubY}
              r="46"
              fill="none"
              stroke="hsl(var(--accent) / 0.45)"
              strokeWidth="1"
            />
            <circle
              cx={hubX}
              cy={hubY}
              r="24"
              fill="none"
              stroke="hsl(var(--accent) / 0.75)"
              strokeWidth="1.5"
            />

            {/* Central hub point */}
            <circle
              cx={hubX}
              cy={hubY}
              r="6"
              fill="hsl(var(--accent))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
            />
            <circle
              cx={hubX}
              cy={hubY}
              r="2.5"
              fill="hsl(var(--foreground))"
            />
          </g>
        </svg>
      </div>

      {/* Bottom Minimal Indicator */}
      <div className="mt-3 flex w-full items-center justify-between border-t border-border/40 pt-2.5 px-1 text-[10px] text-muted-foreground shrink-0">
        <span className="font-semibold text-foreground/80">Real GIS Boundaries</span>
        <span>54 Nations · Pan-African</span>
      </div>
    </div>
  );
};

export default AfricaReach;
