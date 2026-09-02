import { ArrowUpRight } from "lucide-react";
import { alikore } from "@/lib/alikore";
import Reveal from "@/components/visual/Reveal";

const steps = ["Build with us", "Test with us", "Improve with us"];

const PilotSection = () => (
  <section className="relative section-y overflow-hidden section-navy-deep-bg">
    <div aria-hidden="true" className="absolute inset-0 blueprint-grid-dark mask-fade-edges" />

    <div className="container-max relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
      <Reveal className="lg:col-span-7">
        <span className="eyebrow">Building With The Industry</span>
        <h2 className="mt-4 display-2 text-primary-foreground">
          Building with pilot partners in Ethiopia.
        </h2>
        <p className="mt-4 body-lg text-primary-foreground/85">
          Construction teams run Alikore on real projects through structured pilots. Their feedback decides
          what we improve and what we build next.
        </p>
        <a href={alikore.pilot} target="_blank" rel="noopener noreferrer" className="btn-accent-lg mt-8">
          Explore the Alikore Pilot Program <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </Reveal>

      <Reveal className="lg:col-span-5" delay={0.1}>
        <ol className="divide-y divide-primary-foreground/12 rounded-2xl border border-primary-foreground/12 bg-primary-foreground/[0.05] backdrop-blur-md">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 px-6 py-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/18 text-[11px] font-extrabold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base font-semibold text-primary-foreground">{s}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  </section>
);

export default PilotSection;
