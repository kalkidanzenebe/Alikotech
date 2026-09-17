import bg from "@/assets/construction-skyline.jpg";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import CountUp from "@/components/visual/CountUp";

/** Act 1 + 2: the industry and the African opportunity, as headline numbers. */
const industry = [
  { value: 13, prefix: "11-", suffix: "%", label: "of global GDP" },
  { value: 9, prefix: "~", suffix: "%", label: "of the world's workforce" },
];

interface OpportunityStat {
  label: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  isRange?: boolean;
  from?: number;
  to?: number;
  badge?: string;
  title?: string;
}

const opportunity: OpportunityStat[] = [
  { value: 700, prefix: "+", suffix: "M", label: "Additional urban residents by 2050" },
  { value: 1.4, suffix: "B", decimals: 1, label: "African urban population by 2050" },
  { value: 170, prefix: "$130-", suffix: "B", label: "Annual infrastructure need" },
  {
    isRange: true,
    from: 24.5,
    to: 42.3,
    suffix: "M",
    decimals: 1,
    badge: "Flagship",
    title: "Ethiopia",
    label: "Projected urban growth by 2037",
  },
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
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Left: The Industry text */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">The Industry</span>
              <h2 className="mt-4 display-2 text-primary-foreground">
                Construction builds the global economy.
              </h2>
              <p className="mt-4 body-lg text-primary-foreground/85">
                Yet productivity has grown far slower than manufacturing, and large projects still face persistent delay and cost pressure.
              </p>
            </Reveal>
          </div>

          {/* Right: The two cards */}
          <div className="lg:col-span-5">
            <RevealGroup className="grid gap-4 sm:grid-cols-2" as="ul">
              {industry.map((s) => (
                <RevealItem key={s.label} as="li" className="card-premium-dark flex flex-col justify-between text-left">
                  <p className="text-[2rem] font-extrabold tracking-tight text-accent sm:text-[2.5rem]">
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{s.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-14 border-t border-primary-foreground/15 pt-14">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The Opportunity</span>
            <h2 className="mt-4 display-2 text-primary-foreground">Africa is building its urban future.</h2>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" as="ul">
            {opportunity.map((s) => (
              <RevealItem key={s.label} as="li" className="card-premium-dark flex flex-col justify-between">
                <div>
                  {s.isRange ? (
                    <p className="text-[1.75rem] font-extrabold tracking-tight text-accent sm:text-[2.15rem]">
                      <CountUp value={s.from!} suffix={s.suffix} decimals={s.decimals} />
                      <span className="mx-1 text-base font-bold text-primary-foreground/60 sm:text-lg">to</span>
                      <CountUp value={s.to!} suffix={s.suffix} decimals={s.decimals} />
                    </p>
                  ) : (
                    <p className="text-[2rem] font-extrabold tracking-tight text-accent sm:text-[2.5rem]">
                      <CountUp value={s.value!} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    </p>
                  )}
                  {s.badge && (
                    <span className="mt-1 inline-block text-[11px] font-bold uppercase tracking-wider text-accent">
                      {s.badge} · {s.title}
                    </span>
                  )}
                </div>
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
            African Development Bank, World Bank.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default DataStorySection;
