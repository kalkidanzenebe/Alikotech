import { ArrowUpRight, ClipboardList, FolderOpen, Users, Wallet } from "lucide-react";
import alikoreLogo from "@/assets/alikore-logo.png";
import bg from "@/assets/infrastructure.jpg";
import { alikore } from "@/lib/alikore";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";

const surfaces = [
  { icon: ClipboardList, label: "Field updates" },
  { icon: FolderOpen, label: "Project records" },
  { icon: Users, label: "Team coordination" },
  { icon: Wallet, label: "Cost visibility" },
];

const WhatWeBuildSection = () => (
  <section id="products" className="relative section-y overflow-hidden scroll-mt-20">
    <div className="absolute inset-0">
      <img src={bg} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overlay-editorial" />
      <div aria-hidden="true" className="absolute inset-0 blueprint-grid-dark mask-fade-edges" />
    </div>

    <div className="container-max relative z-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className="lg:col-span-5">
        <span className="eyebrow">What We Build</span>
        <h2 className="mt-4 display-2 text-primary-foreground">
          One platform, built deliberately.
        </h2>
        <p className="mt-4 body-lg text-primary-foreground/85">
          AlikoTech is the technology company. Alikore is its flagship construction platform, connecting the
          information behind a live project in one workspace.
        </p>

        <ul className="mt-7 grid gap-2 sm:grid-cols-2">
          {surfaces.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-primary-foreground/12 bg-primary-foreground/[0.05] px-4 py-3 backdrop-blur-sm"
            >
              <s.icon size={17} aria-hidden="true" className="shrink-0 text-accent" />
              <span className="text-sm font-medium text-primary-foreground/90">{s.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Product showcase */}
      <RevealGroup className="lg:col-span-7" stagger={0.1}>
        <RevealItem className="card-premium-dark mx-auto w-full max-w-xl overflow-hidden p-0 shadow-[0_28px_70px_-28px_hsl(214_52%_5%/0.8)]">
          <div className="flex items-center justify-between border-b border-primary-foreground/12 px-5 py-3.5">
            <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
              Live, MVP in Ethiopia
            </span>
            <span className="label-tag border border-accent/40 bg-accent/20 text-accent">Flagship</span>
          </div>

          <div className="px-6 py-9 text-center sm:px-10">
            <img
              src={alikoreLogo}
              alt="Alikore"
              className="mx-auto h-28 w-auto object-contain sm:h-36"
              loading="lazy"
            />
            <p className="mt-6 text-base font-semibold text-primary-foreground">
              Construction Project Control &amp; Management
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80">
              Field updates, project records, coordination, and cost visibility in one
              shared workspace.
            </p>

            <a
              href={alikore.home}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent-lg mt-7 w-full sm:w-auto"
            >
              Explore Alikore <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </RevealItem>
      </RevealGroup>
    </div>
  </section>
);

export default WhatWeBuildSection;
