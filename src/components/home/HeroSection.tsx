import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroBg from "@/assets/africa-skyline.jpg";
import { alikore } from "@/lib/alikore";
import { EASE } from "@/components/visual/Reveal";

const chain = ["Field", "Records", "Teams", "Cost"];

const HeroSection = () => {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[86vh] items-center overflow-hidden">
      {/* Image + editorial scrim */}
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt="High rise construction site at dusk in an African city"
          className="h-full w-full object-cover"
          loading="eager"
          initial={{ scale: reduced ? 1 : 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <div className="absolute inset-0 overlay-editorial" />
      </div>

      {/* Blueprint / data overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid-dark mask-fade-edges" />
        <svg className="absolute inset-y-0 right-0 hidden h-full w-[55%] lg:block" viewBox="0 0 600 700" fill="none">
          <g stroke="hsl(var(--accent) / 0.45)" strokeWidth="1.25" className="flow-line">
            <path d="M40 560 L200 560 L280 460 L420 460 L500 340 L560 340" />
            <path d="M40 200 L180 200 L260 300 L420 300 L500 340" />
          </g>
          {[
            [200, 560],
            [280, 460],
            [420, 460],
            [500, 340],
            [260, 300],
          ].map(([cx, cy], i) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="5"
              fill="hsl(var(--accent))"
              style={reduced ? undefined : { animation: `pulse-node 3s ease-in-out ${i * 0.4}s infinite` }}
            />
          ))}
        </svg>
      </div>

      <div className="container-max relative z-10 py-20 lg:py-24">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="eyebrow">Construction Technology</span>

          <h1 className="mt-5 display-1 text-primary-foreground">
            Building technology
            <br />
            for the <span className="text-accent">future of construction.</span>
          </h1>

          <p className="mt-6 max-w-[560px] body-lg text-primary-foreground/85">
            AlikoTech builds practical software for construction teams. Our flagship platform, Alikore,
            connects field updates, project records, coordination, and cost visibility in one workspace.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={alikore.home} target="_blank" rel="noopener noreferrer" className="btn-accent-lg">
              Discover Alikore <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link to="/about" className="btn-quiet-light">
              About AlikoTech
            </Link>
          </div>

          {/* Chain strip */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-primary-foreground/15 pt-6">
            {chain.map((c, i) => (
              <li key={c} className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/80">
                  {c}
                </span>
                {i < chain.length - 1 && (
                  <span aria-hidden="true" className="h-[1px] w-5 bg-accent/60" />
                )}
              </li>
            ))}
            <li className="ml-1 rounded-full border border-accent/45 bg-accent/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              AI assisted
            </li>
          </ul>

          <p className="mt-5 text-sm text-primary-foreground/75">
            Built for African construction conditions. Designed to scale beyond them.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
