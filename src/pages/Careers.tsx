import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import alikoLogo from "@/assets/alikotech-logo.png";

const Careers = () => (
  <>
    <Seo
      title="Careers | AlikoTech"
      description="Explore career opportunities at AlikoTech and AlikoHub. We are building technology for construction in emerging markets."
      path="/careers"
    />
    <Navbar />
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16 section-navy-bg md:min-h-[calc(100vh-4.5rem)]">
      {/* Subtle ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 blueprint-grid-dark opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.05] p-7 text-center shadow-[0_24px_60px_-20px_hsl(214_52%_5%/0.9)] backdrop-blur-xl sm:p-8"
        >
          {/* Active status indicator */}
          <div className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
            <span>Active Openings</span>
          </div>

          {/* Prominent Logo */}
          <div className="mt-6 flex justify-center">
            <img
              src={alikoLogo}
              alt="AlikoTech"
              className="h-12 w-auto object-contain sm:h-14"
              loading="eager"
            />
          </div>

          {/* Title & Description */}
          <h1 className="mt-5 text-xl font-bold tracking-tight text-primary-foreground sm:text-2xl">
            Careers at AlikoTech
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
            Explore opportunities across engineering, product design, and operations.
          </p>

          {/* CTA Link */}
          <div className="mt-7">
            <a
              href="https://career.alikohub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex w-full items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-accent/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Open Positions</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <p className="mt-3.5 text-[11px] text-primary-foreground/45">
            career.alikohub.com
          </p>
        </motion.div>
      </div>
    </main>
    <Footer />
  </>
);

export default Careers;
