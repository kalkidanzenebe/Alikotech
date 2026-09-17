import {
  ClipboardList,
  FolderOpen,
  Users,
  Wallet,
} from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import SectionHeader from "@/components/visual/SectionHeader";
import ConnectFlow from "@/components/visual/ConnectFlow";

const pillars = [
  { icon: ClipboardList, title: "Field", body: "Daily logs and site photos captured from active job sites." },
  { icon: FolderOpen, title: "Records", body: "RFIs, submittals, punch items, and tasks in one place." },
  { icon: Users, title: "Teams", body: "Companies, projects, membership, and role based permissions." },
  { icon: Wallet, title: "Cost", body: "Budgets, commitments, changes, billings, payments, and retention." },
];

const WhatAlikoreConnectsSection = () => (
  <section className="relative section-y overflow-hidden section-navy-bg">
    <div aria-hidden="true" className="absolute inset-0 blueprint-grid-dark mask-fade-edges" />

    <div className="container-max relative">
      <SectionHeader
        dark
        eyebrow="What Alikore Connects"
        title={<>Four working areas. One connected platform.</>}
        intro="Field, records, teams, and cost stay connected in one unified project control system."
      />

      {/* Pillars */}
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" as="ul">
        {pillars.map((p) => (
          <RevealItem key={p.title} as="li" className="card-premium-dark group h-full">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/18 transition-transform duration-300 group-hover:-translate-y-0.5">
              <p.icon size={20} aria-hidden="true" className="text-accent" />
            </div>
            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-primary-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{p.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Flow diagram */}
      <Reveal className="mt-10">
        <ConnectFlow
          dark
          terminal="Unified Control"
          nodes={[
            { key: "field", label: "Field" },
            { key: "records", label: "Records" },
            { key: "teams", label: "Teams" },
            { key: "cost", label: "Cost" },
          ]}
        />
      </Reveal>
    </div>
  </section>
);

export default WhatAlikoreConnectsSection;
