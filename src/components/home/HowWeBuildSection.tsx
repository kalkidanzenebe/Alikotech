import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";

const principles = [
  { n: "01", title: "Practical First", body: "We build for problems construction teams actually hit on site." },
  { n: "02", title: "Build With Users", body: "The product is shaped by real workflows and feedback from live projects." },
  { n: "03", title: "AI With Human Control", body: "AI assists defined tasks. People review and own the final record." },
  { n: "04", title: "Evidence Before Claims", body: "We separate what works today from what is being validated." },
];

const HowWeBuildSection = () => (
  <section className="section-y-tight bg-background">
    <div className="container-max">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">How We Build</span>
          <h2 className="mt-4 display-2 text-foreground">Four principles, applied.</h2>
        </div>
      </Reveal>

      <RevealGroup className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4" as="ul">
        {principles.map((p) => (
          <RevealItem key={p.n} as="li" className="group bg-card p-6 transition-colors hover:bg-muted/60">
            <span className="text-2xl font-extrabold tabular-nums text-accent/35 transition-colors group-hover:text-accent">
              {p.n}
            </span>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  </section>
);

export default HowWeBuildSection;
