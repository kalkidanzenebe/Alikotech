import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ExternalLink,
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import SectionHeader from "@/components/visual/SectionHeader";
import ConnectFlow from "@/components/visual/ConnectFlow";
import BlueprintBackdrop from "@/components/visual/BlueprintBackdrop";
import alikoreLogo from "@/assets/alikore-logo.png";
import { alikore } from "@/lib/alikore";

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

const Products = () => (
  <>
    <Seo
      title="Products | AlikoTech"
      description="AlikoTech develops Alikore, a construction project control and management platform built for African construction conditions."
      path="/products"
    />
    <Navbar />
    <main>
      {/* Hero: lineage + product preview */}
      <section className="relative overflow-hidden section-navy-bg">
        <BlueprintBackdrop dark />
        <div className="container-max relative section-y">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Products</span>
            <ul className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">
              <li>AlikoTech</li>
              <li aria-hidden="true" className="h-[1px] w-5 bg-accent/60" />
              <li className="text-accent">Alikore</li>
              <li aria-hidden="true" className="h-[1px] w-5 bg-accent/60" />
              <li>Construction Management Platform</li>
            </ul>
            <h1 className="mt-5 display-1 text-primary-foreground">
              Alikore is our <span className="text-accent">flagship product.</span>
            </h1>
            <p className="mt-5 body-lg text-primary-foreground/85">
              One shared workspace for field updates, project records, team coordination, cost visibility,
              and AI assisted workflows, built for African construction conditions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a href={alikore.home} target="_blank" rel="noopener noreferrer" className="btn-accent-lg">
                View Alikore <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <Link to="/contact" className="btn-quiet-light">
                Talk to AlikoTech
              </Link>
            </div>
          </Reveal>

          {/* Product preview frame */}
          <Reveal className="mt-14" delay={0.1}>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.05] shadow-[0_28px_70px_-28px_hsl(214_52%_5%/0.8)] backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-primary-foreground/12 px-5 py-3.5">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </span>
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-400" />
                  Live, MVP in Ethiopia
                </span>
                <img src={alikoreLogo} alt="" aria-hidden="true" className="h-5 w-auto object-contain opacity-80" />
              </div>
              <div className="grid gap-px bg-primary-foreground/10 sm:grid-cols-[150px_1fr]">
                <div className="hidden flex-col gap-1 bg-primary/40 p-4 sm:flex">
                  {["Projects", "Tasks", "Contracts", "Inspections", "Team", "Reports"].map((item, i) => (
                    <span
                      key={item}
                      className={`rounded-lg px-3 py-2 text-xs font-medium ${
                        i === 0
                          ? "bg-accent/20 text-accent"
                          : "text-primary-foreground/70"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 bg-primary/25 p-5">
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      { k: "Active projects", v: "12" },
                      { k: "Open tasks", v: "148" },
                      { k: "Inspections due", v: "9" },
                      { k: "Budget used", v: "63%" },
                    ].map((s) => (
                      <div key={s.k} className="rounded-xl border border-primary-foreground/12 bg-primary-foreground/[0.04] p-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground/60">
                          {s.k}
                        </p>
                        <p className="mt-1.5 text-xl font-extrabold text-primary-foreground">{s.v}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 rounded-xl border border-primary-foreground/12 bg-primary-foreground/[0.04] p-4">
                    {[
                      { n: "Bole Tower, Block B", p: 78 },
                      { n: "Adama Road Segment 4", p: 54 },
                      { n: "Hawassa Warehouse", p: 31 },
                    ].map((row) => (
                      <div key={row.n}>
                        <div className="flex items-center justify-between text-xs text-primary-foreground/85">
                          <span className="font-medium">{row.n}</span>
                          <span className="tabular-nums text-primary-foreground/65">{row.p}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-primary-foreground/12">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${row.p}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg border border-accent/30 bg-accent/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                      AI summary drafted
                    </span>
                    <span className="text-xs text-primary-foreground/70">
                      Site log structured, pending engineer review
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* Four pillars */}
      <section className="section-y bg-background">
        <div className="container-max">
          <SectionHeader
            eyebrow="What Alikore Connects"
            title={<>Four working areas. One intelligence layer.</>}
            intro="Field, records, teams, and cost stay connected, with a thin layer of AI assistance where it removes repetitive work."
          />

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" as="ul">
            {pillars.map((p) => (
              <RevealItem key={p.title} as="li" className="card-premium group h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <p.icon size={20} aria-hidden="true" className="text-accent" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <ConnectFlow
              terminal="AI Intelligence"
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

      {/* AI layer */}
      <section className="relative section-y overflow-hidden section-navy-bg">
        <BlueprintBackdrop dark />
        <div className="container-max relative">
          <SectionHeader
            dark
            eyebrow="AI Assisted Workflows"
            title={<>AI where it helps the workflow.</>}
            intro="Current MVP capabilities are limited to the five below. Users review every output before it becomes a project record."
          />

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {aiCapabilities.map((c) => (
              <RevealItem key={c.title} as="li" className="card-premium-dark">
                <div className="flex items-center gap-3">
                  <c.icon size={18} aria-hidden="true" className="shrink-0 text-accent" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-primary-foreground">{c.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8 rule-accent">
            <p className="text-base font-bold text-primary-foreground">AI assists. Project teams decide.</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">
              Generated content is assistive, not autonomous. Original project information is always
              preserved, and users remain responsible for review and final action.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y bg-background">
        <div className="container-max text-center">
          <Reveal className="mx-auto max-w-2xl">
            <span className="eyebrow">Start With Alikore</span>
            <h2 className="mt-4 display-2 text-foreground">See the product in action.</h2>
            <p className="mt-4 body-lg text-muted-foreground">
              Explore Alikore, or talk to AlikoTech about pilots, partnerships, and how it fits your project
              delivery workflow.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a href={alikore.home} target="_blank" rel="noopener noreferrer" className="btn-accent-lg">
                View Alikore <ExternalLink size={16} aria-hidden="true" />
              </a>
              <Link to="/contact" className="btn-quiet-dark">
                Contact AlikoTech
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Products;
