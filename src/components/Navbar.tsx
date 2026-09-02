import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import alikoLogo from "@/assets/alikotech-logo.png";
import { alikore } from "@/lib/alikore";

const links = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Leadership", to: "/leadership" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isActive = (to: string) => location.pathname === to;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-primary-foreground/10 bg-[hsl(214_52%_8%)] backdrop-blur-xl"
          : "border-b border-primary-foreground/10 bg-[hsl(214_52%_8%)] backdrop-blur-md"
      }`}
    >
      <nav aria-label="Main" className="container-max flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link to="/" className="flex items-center" aria-label="AlikoTech home">
          <img
            src={alikoLogo}
            alt="AlikoTech"
            className={`object-contain transition-all duration-300 ${scrolled ? "h-11 md:h-12" : "h-12 md:h-14"}`}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              aria-current={isActive(l.to) ? "page" : undefined}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:text-primary-foreground ${
                isActive(l.to) ? "text-accent" : "text-primary-foreground/80"
              }`}
            >
              {l.label}
              {isActive(l.to) && (
                <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-accent" />
              )}
            </Link>
          ))}
          <a
            href={alikore.home}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 active:scale-[0.98]"
          >
            Explore Alikore <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg text-primary-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-full w-full border-b border-primary-foreground/10 bg-[hsl(214_52%_8%/0.98)] p-5 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${
                  isActive(l.to) ? "text-accent" : "text-primary-foreground/85"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={alikore.home}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground"
            >
              Explore Alikore <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
