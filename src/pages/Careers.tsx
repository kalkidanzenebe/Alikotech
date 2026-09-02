import { ExternalLink, Users, Globe, Lightbulb, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import SectionHeader from "@/components/visual/SectionHeader";
import teamPhoto from "@/assets/team-construction.jpg";

const values = [
  {
    icon: Target,
    title: "Practical Impact",
    description: "We build tools that solve real field problems, tested against daily construction workflows.",
  },
  {
    icon: Globe,
    title: "Africa First",
    description: "Designed for African conditions: offline sites, multi-currency projects, mobile field teams.",
  },
  {
    icon: Users,
    title: "Built With Users",
    description: "Engineers, site managers, and finance teams help shape our roadmap. We listen first.",
  },
  {
    icon: Lightbulb,
    title: "Thoughtful Technology",
    description: "We use AI where it genuinely helps, keep humans in control, and avoid unproven claims.",
  },
];

const Careers = () => (
  <>
    <Seo
      title="Careers | AlikoTech"
      description="Explore opportunities to help AlikoTech build practical technology for construction."
      path="/careers"
    />
    <Navbar />
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={teamPhoto} alt="AlikoTech and construction team working together" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 overlay-editorial" />
        </div>
        <div className="container-max relative z-10 py-20 sm:py-24">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Careers</span>
            <h1 className="mt-5 display-1 text-primary-foreground">
              Help build technology for construction.
            </h1>
            <p className="mt-5 body-lg text-primary-foreground/85">
              AlikoTech is building practical technology for construction teams, starting with Alikore and
              the Ethiopian market. We are looking for people who understand technology, construction,
              product, and the realities of emerging markets.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y-tight bg-background">
        <div className="container-max">
          <SectionHeader
            align="center"
            eyebrow="Work With Us"
            title={<>Build with purpose.</>}
            intro="Join a team focused on making construction management simpler, more transparent, and more reliable across Africa."
          />

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" as="ul">
            {values.map((v) => (
              <RevealItem key={v.title} as="li" className="card-premium">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <v.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/60 bg-muted/40 p-8 text-center sm:flex-row sm:justify-between sm:p-10 sm:text-left">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">Find your next role</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                All open positions are posted on the AlikoHub careers page. Check back if nothing matches
                today, we are growing steadily.
              </p>
            </div>
            <a
              href="https://career.alikohub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent-lg shrink-0"
            >
              View Open Roles
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Careers;
