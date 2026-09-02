import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, MapPin, Twitter, Youtube } from "lucide-react";
import alikoLogo from "@/assets/alikotech-logo.png";
import { alikore } from "@/lib/alikore";
import { offices, socials } from "@/lib/company";

const socialIcons = {
  linkedin: Linkedin,
  x: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
} as const;



const Footer = () => (
  <footer className="relative overflow-hidden section-navy-deep-bg py-14 text-primary-foreground">
    <div aria-hidden="true" className="absolute inset-0 blueprint-grid-dark mask-fade-edges" />
    <div className="container-max relative">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 md:col-span-3 lg:col-span-2">
          <img src={alikoLogo} alt="AlikoTech" className="h-16 object-contain mb-3" />
          <p className="text-sm text-primary-foreground/80 leading-relaxed max-w-xs">
            Building practical construction technology.
          </p>
          <p className="mt-2 text-xs text-primary-foreground/85 leading-relaxed max-w-xs">
            A construction technology business of AlikoHub LLC.
          </p>

          <h4 className="mt-7 mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">Offices</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            {offices.map((o) => (
              <li key={o.label} className="flex gap-3">
                <MapPin size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                <span className="leading-relaxed">
                  <span className="sr-only">{o.label} office: </span>
                  {o.address}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About</Link></li>
            <li><Link to="/leadership" className="hover:text-primary-foreground transition-colors">Leadership</Link></li>
            <li><Link to="/careers" className="hover:text-primary-foreground transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">Product</h4>
          <p className="text-sm text-primary-foreground/80 leading-relaxed mb-3">
            Alikore is AlikoTech's construction project control and management platform.
          </p>
          <a
            href={alikore.home}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            View Alikore
          </a>
        </div>

        <div>
          <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground/70">Legal</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-primary-foreground/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-sm font-bold text-primary-foreground">Follow AlikoTech</h4>
        <ul className="flex flex-wrap gap-2">
          {socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`AlikoTech on ${s.name}`}
                  title={s.name}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] text-primary-foreground/85 transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 border-t border-primary-foreground/15 pt-6 text-center text-xs text-primary-foreground/85">
        © 2026 AlikoHub LLC. AlikoTech develops Alikore. All rights reserved.

      </div>

    </div>
  </footer>
);

export default Footer;
