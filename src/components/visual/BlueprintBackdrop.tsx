interface BlueprintBackdropProps {
  /** Use the light-on-dark grid variant. */
  dark?: boolean;
  className?: string;
}

/**
 * Decorative blueprint grid plus architectural corner marks. Purely visual.
 */
const BlueprintBackdrop = ({ dark, className = "" }: BlueprintBackdropProps) => (
  <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
    <div className={`absolute inset-0 mask-fade-edges ${dark ? "blueprint-grid-dark" : "blueprint-grid"}`} />
    <svg
      className={dark ? "absolute inset-0 h-full w-full text-primary-foreground/12" : "absolute inset-0 h-full w-full text-foreground/10"}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 1200 600"
    >
      <path d="M0 480 L280 480 L360 400 L640 400 L720 320 L1200 320" stroke="currentColor" strokeWidth="1" />
      <path d="M0 120 L420 120 L500 200 L1200 200" stroke="currentColor" strokeWidth="1" strokeDasharray="6 10" />
      <circle cx="360" cy="400" r="3.5" fill="currentColor" />
      <circle cx="720" cy="320" r="3.5" fill="currentColor" />
      <circle cx="500" cy="200" r="3.5" fill="currentColor" />
    </svg>
  </div>
);

export default BlueprintBackdrop;
