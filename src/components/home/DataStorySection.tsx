import { ClipboardList, FolderOpen, Users, Wallet, Database } from "lucide-react";
import bg from "@/assets/construction-skyline.jpg";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import CountUp from "@/components/visual/CountUp";
import SectionHeader from "@/components/visual/SectionHeader";

/** Act 1 + 2: the industry and the African opportunity, as headline numbers. */
const industry = [
  { value: 13, prefix: "11-", suffix: "%", label: "of global GDP" },
  { value: 9, prefix: "~", suffix: "%", label: "of the world's workforce" },
  { value: 37, prefix: "~", suffix: "%", label: "of global CO₂ emissions" },
];

const opportunity = [
  { value: 700, prefix: "+", suffix: "M", label: "additional African urban residents projected by 2050" },
  { value: 1.4, suffix: "B", decimals: 1, label: "African urban population projected by 2050" },
  { value: 170, prefix: "$130-", suffix: "B", label: "estimated annual African infrastructure investment need" },
];

const challenges = [
  "Field information gets separated from office decisions.",
  "Project records live across different people and systems.",
  "Commercial status drifts from what is happening on site.",
];

const chain = [
  { icon: ClipboardList, k: "Field", v: "Site activity, photos, issues, and progress reach the office." },
  { icon: FolderOpen, k: "Records", v: "RFIs, submittals, tasks, and punch items get clear ownership." },
  { icon: Users, k: "People", v: "Everyone knows who is responsible for what." },
  { icon: Wallet, k: "Money", v: "Budgets, changes, billings, and payments stay tied to the work." },
  { icon: Database, k: "Data", v: "Project information becomes usable, not scattered." },
];

const DataStorySection = () => (
  <>
    {/* ACT 1 + 2 — the industry, then the opportunity */}
    <section className="relative section-y overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 overlay-editorial" />
        <div aria-hidden="true" className="absolute inset-0 blueprint-grid-dark mask-fade-edges" />
      </div>

      <div className="container-max relative z-10">
        <SectionHeader
          dark
          eyebrow="The Industry"
          title={<>Construction builds the global economy.</>}
          intro="Yet productivity has grown far slower than manufacturing, and large projects still face persistent delay and cost pressure."
        />

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3" as="ul">
          {industry.map((s) => (
            <RevealItem key={s.label} as="li" className="card-premium-dark">
              <p className="text-[2rem] font-extrabold tracking-tight text-accent sm:text-[2.5rem]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 border-t border-primary-foreground/15 pt-14">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The Opportunity</span>
            <h2 className="mt-4 display-2 text-primary-foreground">Africa is building its urban future.</h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-3" as="ul">
            {opportunity.map((s) => (
              <RevealItem key={s.label} as="li" className="card-premium-dark">
                <p className="text-[2rem] font-extrabold tracking-tight text-accent sm:text-[2.5rem]">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8 max-w-3xl rule-accent">
            <p className="text-base font-bold text-primary-foreground">
              Building more infrastructure is only part of the challenge.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
              Alikore does not solve the financing gap. It helps construction companies control the projects
              that financing creates.
            </p>
          </Reveal>

          <p className="mt-8 text-xs leading-relaxed text-primary-foreground/70">
            Sources: UNEP Global Status Report for Buildings and Construction, McKinsey &amp; Company, OECD,
            African Development Bank.
          </p>
        </div>
      </div>
    </section>

    {/* ACT 3 — the challenge, with Ethiopia as flagship market */}
    <section className="section-y bg-background">
      <div className="container-max grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeader
            eyebrow="The Challenge"
            title={<>More projects create more complexity.</>}
          />
          <RevealGroup className="mt-7 space-y-3" as="ul">
            {challenges.map((c, i) => (
              <RevealItem key={c} as="li" className="flex gap-4 rounded-xl border border-border bg-card p-4">
                <span className="text-sm font-extrabold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{c}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="lg:col-span-6" delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-accent/25 bg-accent/[0.06] p-7 sm:p-9">
            <div aria-hidden="true" className="absolute inset-0 blueprint-grid mask-fade-edges opacity-60" />
            <div className="relative">
              <span className="eyebrow">Flagship Market</span>
              <h3 className="mt-4 display-3 text-foreground">Starting in Ethiopia.</h3>
              <p className="mt-7 text-[2.25rem] font-extrabold tracking-tight text-accent sm:text-[2.75rem]">
                <CountUp value={24.5} suffix="M" decimals={1} />
                <span className="mx-2 text-xl font-bold text-muted-foreground">to</span>
                <CountUp value={42.3} suffix="M" decimals={1} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ethiopia's urban population is projected to grow substantially by 2037. Source: World Bank.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                We are starting close to the problem, working with construction teams in Ethiopia before
                expanding across African markets.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ACT 4 — the response */}
    <section className="section-y bg-muted/40">
      <div className="container-max">
        <SectionHeader
          eyebrow="The Response"
          title={<>One connected project control layer.</>}
          intro="Alikore brings the critical information behind a live construction project into one workspace."
        />

        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" as="ol">
          {chain.map((c, i) => (
            <RevealItem key={c.k} as="li" className="card-premium h-full">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/12">
                  <c.icon size={18} aria-hidden="true" className="text-accent" />
                </span>
                <span className="text-[11px] font-extrabold tabular-nums text-accent/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-foreground">{c.k}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.v}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-accent/25 bg-card p-7 text-center sm:p-10">
            <p className="mx-auto max-w-3xl text-xl font-extrabold leading-snug tracking-tight text-foreground sm:text-2xl">
              Africa does not only need more construction. It needs better control of how construction is
              delivered.
            </p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              AlikoTech builds the technology. Alikore is the project control platform.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  </>
);

export default DataStorySection;
