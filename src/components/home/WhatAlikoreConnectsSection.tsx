import {
  ClipboardList,
  FolderOpen,
  Users,
  Wallet,
  Sparkles,
  FileText,
  MessageSquare,
  FileStack,
  ListChecks,
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

const aiCapabilities = [
  { icon: ListChecks, title: "Daily Log Structuring", body: "Turns raw site notes into structured fields such as activity, issue, reason, and impact." },
  { icon: FileText, title: "Log Summaries", body: "Short summaries so project managers can review site activity faster." },
  { icon: FileStack, title: "RFI Drafts", body: "Turns a short issue note into a structured RFI draft. Users edit before submission." },
  { icon: MessageSquare, title: "Copilot", body: "Project Q&A using permitted context such as daily logs, RFIs, and basic cost information." },
  { icon: Sparkles, title: "Document Classification", body: "Basic classification of uploads such as RFI, Report, or General documents." },
];

const WhatAlikoreConnectsSection = () => (
  <section className="relative section-y overflow-hidden section-navy-bg">
    <div aria-hidden="true" className="absolute inset-0 blueprint-grid-dark mask-fade-edges" />

    <div className="container-max relative">
      <SectionHeader
        dark
        eyebrow="What Alikore Connects"
        title={<>Four working areas. One intelligence layer.</>}
        intro="Field, records, teams, and cost stay connected, with a thin layer of AI assistance where it removes repetitive work."
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
          terminal="AI Intelligence"
          nodes={[
            { key: "field", label: "Field" },
            { key: "records", label: "Records" },
            { key: "teams", label: "Teams" },
            { key: "cost", label: "Cost" },
          ]}
        />
      </Reveal>

      {/* AI layer */}
      <Reveal className="mt-10">
        <div className="rounded-2xl border border-primary-foreground/12 bg-primary-foreground/[0.05] p-6 backdrop-blur-md sm:p-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">AI Assisted Workflows</span>
              <h3 className="mt-3 display-3 text-primary-foreground">AI where it helps the workflow.</h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/80">
              Current MVP capabilities are limited to the five below.
            </p>
          </div>

          <RevealGroup className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {aiCapabilities.map((c) => (
              <RevealItem
                key={c.title}
                as="li"
                className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.04] p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-3">
                  <c.icon size={17} aria-hidden="true" className="shrink-0 text-accent" />
                  <h4 className="text-sm font-bold uppercase tracking-wide text-primary-foreground">{c.title}</h4>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-8 rule-accent">
            <p className="text-base font-bold text-primary-foreground">AI assists. Project teams decide.</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">
              Generated content is assistive, not autonomous. Users review outputs before they become project
              records, and original project information is preserved.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default WhatAlikoreConnectsSection;
