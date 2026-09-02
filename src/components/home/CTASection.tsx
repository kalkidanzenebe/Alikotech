import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import teamBg from "@/assets/team-meeting.jpg";
import { alikore } from "@/lib/alikore";
import Reveal from "@/components/visual/Reveal";

const CTASection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={teamBg} alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overlay-editorial" />
    </div>

    <div className="container-max relative z-10 py-20 text-center sm:py-24">
      <Reveal>
        <h2 className="mx-auto max-w-2xl display-2 text-primary-foreground">See what we're building.</h2>
        <p className="mx-auto mt-4 max-w-lg body-lg text-primary-foreground/85">
          Explore Alikore, or talk to AlikoTech about pilots and partnerships.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <a href={alikore.home} target="_blank" rel="noopener noreferrer" className="btn-accent-lg">
            Explore Alikore <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <Link to="/contact" className="btn-quiet-light">
            Contact AlikoTech
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTASection;
