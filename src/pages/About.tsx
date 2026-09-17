import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import heroBg from "@/assets/construction-skyline.jpg";
import { alikore } from "@/lib/alikore";




const techConcepts = [
  { title: "Structured Data", body: "Capture project information in reusable, connected records." },
  { title: "Workflow Automation", body: "Reduce repetitive work while preserving clear project processes." },
  { title: "AI Assistance", body: "Use AI for defined tasks such as structuring, summarizing, drafting, and project Q&A, while keeping users in control." },
];


const About = () => (
  <>
    <Seo
      title="About AlikoTech | Construction Technology Company"
      description="Learn about AlikoTech, the construction technology business developing Alikore and building practical digital products from Ethiopia for African construction."
      path="/about"
    />
    <Navbar />
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Construction skyline" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 overlay-navy" />
        </div>
        <div className="container-max relative z-10 py-24">
          <motion.div
            className="max-w-3xl space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="label-tag border border-accent/40 bg-accent/25 text-accent">About AlikoTech</span>
            <h1 className="text-[2.1rem] font-extrabold leading-[1.08] tracking-tighter text-primary-foreground sm:text-4xl md:text-6xl">
              Technology built around
              <br />
              how construction <span className="text-accent">actually works.</span>
            </h1>
            <div className="max-w-[640px] space-y-4 leading-relaxed text-primary-foreground/85">
              <p>
                AlikoTech is the construction technology business of AlikoHub LLC. We build practical
                digital products around how projects are actually delivered, combining structured
                workflows, connected data, and carefully scoped AI assistance.
              </p>
              <p>
                Our flagship product, Alikore, covers field updates, project records, team coordination,
                cost visibility, and selected AI assisted workflows. We are validating it with
                construction teams in Ethiopia before expanding across African markets.
              </p>
            </div>

            <a
              href={alikore.home}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent"
            >
              Explore Alikore <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Market reality */}
      <section className="section-padding bg-background">
        <div className="container-max grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <span className="label-tag border border-accent/25 bg-accent/10 text-accent">Market Reality</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              A real market need,
              <br />
              not a technology trend.
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Construction remains one of the least digitised industries. Field activity, records,
                coordination, and cost information usually sit in separate tools, so problems surface late
                and accountability is hard to trace.
              </p>
              <p>
                African construction is expanding, but most existing platforms assume dependable internet,
                single currency contracts, and office based teams. That mismatch, not a lack of interest,
                is what limits adoption.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:content-start">
            {[
              { t: "The Gap", b: "Software built for other operating conditions rarely survives contact with an African site." },
              { t: "The Demand", b: "Teams want fewer disconnected tools and clearer project truth, not more dashboards." },
              { t: "The Constraint", b: "Offline capture, multi currency cost, and simple field usability are requirements, not extras." },
              { t: "Our Position", b: "We build close to the work, validate on live projects, then expand." },
            ].map((c) => (
              <div key={c.t} className="card-surface p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* How we use technology */}
      <section className="section-padding bg-muted/50">
        <div className="container-max">
          <div className="max-w-2xl">
            <span className="label-tag border border-accent/20 bg-accent/10 text-accent">
              How We Use Technology
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Practical automation before complexity.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              AlikoTech applies technology where it can make construction information easier to capture,
              organize, retrieve, and act on. In Alikore's current MVP, this includes structured project
              workflows alongside selected AI assisted capabilities.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {techConcepts.map((c) => (
              <div key={c.title} className="card-surface p-6">
                <h3 className="text-base font-bold uppercase tracking-wide text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted-foreground">
            AI generated content is assistive, not autonomous. Users review generated outputs before they
            become project records, and original project information is preserved.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/leadership"
              className="btn-outline-dark"
            >
              Meet the leadership
            </Link>
            <Link
              to="/contact"
              className="btn-accent"
            >
              Contact AlikoTech
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
