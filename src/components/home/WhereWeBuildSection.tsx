import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import CountUp from "@/components/visual/CountUp";
import AfricaReach from "@/components/visual/AfricaReach";

const stages = [
  { k: "Ethiopia", v: "Where we are building and validating today." },
  { k: "Africa", v: "Markets with similar delivery conditions come next." },
  { k: "Global", v: "The same project control problems exist far beyond Africa." },
];

const ambitions = [
  { value: 2500, suffix: "+", label: "construction companies" },
  { value: 50000, suffix: "+", label: "platform users" },
  { value: 15, suffix: "+", label: "countries" },
];

const WhereWeBuildSection = () => (
  <section className="relative section-y overflow-hidden bg-muted/40">
    <div className="container-max grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-14">
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div>
          <Reveal>
            <span className="eyebrow">Where We Build</span>
            <h2 className="mt-4 display-2 text-foreground">Ethiopia first. Africa next. Global in time.</h2>
          </Reveal>

          <RevealGroup className="mt-8 space-y-3" as="ol">
            {stages.map((s, i) => (
              <RevealItem key={s.k} as="li" className="card-premium flex items-start gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/12 text-[11px] font-extrabold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">{s.k}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.v}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-8">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="label-tag border border-accent/30 bg-accent/12 text-accent">Ambitions</span>
              <span className="text-xs font-semibold text-muted-foreground">Targets for 2028, not current results.</span>
            </div>
            <dl className="mt-6 grid gap-6 sm:grid-cols-3">
              {ambitions.map((a) => (
                <div key={a.label}>
                  <dd className="text-2xl font-extrabold tracking-tight text-accent sm:text-3xl">
                    <CountUp value={a.value} suffix={a.suffix} />
                  </dd>
                  <dt className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <Reveal className="lg:col-span-5 h-full flex flex-col" delay={0.1}>
        <AfricaReach className="w-full h-full" />
      </Reveal>
    </div>
  </section>
);

export default WhereWeBuildSection;
