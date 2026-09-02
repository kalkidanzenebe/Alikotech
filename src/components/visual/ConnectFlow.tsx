import { useReducedMotion } from "framer-motion";

export interface FlowNode {
  key: string;
  label: string;
}

interface ConnectFlowProps {
  nodes: FlowNode[];
  /** Label for the terminal intelligence node, e.g. "AI Intelligence". */
  terminal?: string;
  dark?: boolean;
}

/**
 * Horizontal (desktop) / vertical (mobile) connected-node diagram with animated
 * data-flow dashes. Decorative: labels are duplicated as real text so screen
 * readers get the sequence from the list, not the SVG.
 */
const ConnectFlow = ({ nodes, terminal, dark }: ConnectFlowProps) => {
  const reduced = useReducedMotion();
  const all = terminal ? [...nodes, { key: "__terminal", label: terminal }] : nodes;

  const nodeBase = dark
    ? "border-primary-foreground/20 bg-primary-foreground/[0.06] text-primary-foreground"
    : "border-border bg-card text-foreground";

  return (
    <div className="relative">
      {/* Connector rail */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 hidden h-full w-full -translate-x-1/2 md:block">
        <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 100">
          <line
            x1="0"
            y1="50"
            x2="1000"
            y2="50"
            stroke="hsl(var(--accent) / 0.35)"
            strokeWidth="1.5"
            className={reduced ? undefined : "flow-line"}
          />
        </svg>
      </div>

      <ol className="relative z-10 grid gap-3 md:grid-cols-5 md:gap-4">
        {all.map((n, i) => {
          const isTerminal = n.key === "__terminal";
          return (
            <li
              key={n.key}
              className={`flex items-center gap-3 rounded-xl border px-4 py-4 backdrop-blur-sm transition-colors md:flex-col md:gap-2 md:text-center ${
                isTerminal ? "border-accent/50 bg-accent/12" : nodeBase
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  isTerminal ? "bg-accent text-accent-foreground" : "bg-accent/15 text-accent"
                }`}
              >
                {isTerminal ? "AI" : String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-sm font-bold uppercase tracking-wide ${
                  isTerminal ? "text-accent" : dark ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {n.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ConnectFlow;
