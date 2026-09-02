import { WifiOff, Coins, Receipt, HardHat } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import SectionHeader from "@/components/visual/SectionHeader";

const realities = [
  {
    icon: WifiOff,
    title: "Sites Work Offline",
    body: "Connectivity on active sites is unreliable, so field capture cannot depend on a stable connection.",
  },
  {
    icon: Coins,
    title: "Multi Currency Reality",
    body: "Projects mix local and foreign currency for materials, equipment, and imported inputs.",
  },
  {
    icon: Receipt,
    title: "Cost Leaks In The Gaps",
    body: "Approvals, variations, and billing move through informal channels, so exposure surfaces late.",
  },
  {
    icon: HardHat,
    title: "Field Adoption Decides",
    body: "Software only helps if site teams actually use it, so the field experience has to stay simple.",
  },
];

const MarketRealitySection = () => (
  <section className="relative section-y overflow-hidden bg-background">
    <div aria-hidden="true" className="absolute inset-0 blueprint-grid mask-fade-edges opacity-50" />

    <div className="container-max relative">
      <SectionHeader
        eyebrow="Market Reality"
        title={<>Why construction. Why Africa. Why now.</>}
        intro="Most construction software was designed for dependable internet, single currency contracts, and office based teams. Alikore is designed for African conditions first."
      />

      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" as="ul">
        {realities.map((r) => (
          <RevealItem key={r.title} as="li" className="card-premium group h-full">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent/20">
              <r.icon size={20} aria-hidden="true" className="text-accent" />
            </div>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8 max-w-3xl rule-accent">
        <p className="text-sm leading-relaxed text-muted-foreground">
          These conditions come from working directly with construction teams in Ethiopia. We describe them as
          the problems we are building against, not as proven results.
        </p>
      </Reveal>
    </div>
  </section>
);

export default MarketRealitySection;
