import img from "@/assets/construction-workers.jpg";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";

const points = [
  "Capture field and project information once, in a structured form.",
  "Connect records, coordination, and cost so teams work from the same picture.",
  "Automate the repetitive parts while people keep the decisions.",
];

const WhyConstructionSection = () => (
  <section className="section-y bg-background">
    <div className="container-max grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
      <div className="lg:col-span-6">
        <Reveal>
          <span className="eyebrow">Our Response</span>
          <h2 className="mt-4 display-2 text-foreground">
            Fewer disconnected tools.
            <br />
            One clear project picture.
          </h2>
          <p className="mt-4 body-lg text-muted-foreground">
            Instead of adding another isolated tool, AlikoTech builds around how projects already run.
          </p>
        </Reveal>

        <RevealGroup className="mt-8 divide-y divide-border border-y border-border" as="ul">
          {points.map((p, i) => (
            <RevealItem key={p} as="li" className="flex gap-5 py-5">
              <span className="text-2xl font-extrabold leading-none tabular-nums text-accent/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">{p}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal className="lg:col-span-6" delay={0.1}>
        <div className="group relative overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-lift)]">
          <img
            src={img}
            alt="Construction professionals reviewing plans on an active site"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 blueprint-grid-dark opacity-40" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 overlay-bottom" />
        </div>
      </Reveal>
    </div>
  </section>
);

export default WhyConstructionSection;
