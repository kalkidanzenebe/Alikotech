import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, User, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Reveal, { RevealGroup, RevealItem } from "@/components/visual/Reveal";
import boniImg from "@/assets/team/boni-aliko.jpeg";
import abdiImg from "@/assets/team/abdi-birissa.jpeg";
import kalkidanImg from "@/assets/team/kalkidan-zenebe.jpg";
import abelImg from "@/assets/team/abel-desalegn.jpg";
import bonsaImg from "@/assets/team/bonsa-aliko.jpeg";
import hawiImg from "@/assets/team/hawi.jpg";
import yohannesImg from "@/assets/team/yohannes-solomon.jpeg";

const executives = [
  { name: "Boni Aliko", title: "Founder & Chief Executive Officer", initials: "BA", image: boniImg, linkedin: "https://www.linkedin.com/in/bonialiko12" },
  { name: "Abdi Birassa", title: "Chief Operating Officer", initials: "AB", image: abdiImg, linkedin: "https://www.linkedin.com/in/abdi-aliko-1103a4128" },
  { name: "Kalkidan Zenebe", title: "Chief Product Officer", initials: "KZ", image: kalkidanImg, linkedin: "https://www.linkedin.com/in/kalkidanzenebe" },
  { name: "Abel Desalegn", title: "Chief Technology Officer", initials: "AD", image: abelImg, linkedin: "https://www.linkedin.com/in/abel-desalegn" },
  { name: "Bonsa Aliko", title: "Chief Growth & Marketing Officer", initials: "BA", image: bonsaImg, linkedin: "https://www.linkedin.com/in/bonsa-birassa-aliko-a93959176" },
  { name: "Hawi Berhanu", title: "Chief of Staff & Head of People Operations", initials: "HB", image: hawiImg },
];

const advisors = [
  { name: "Yohannes Solomon", title: "Senior Strategic Advisor and Construction Expert", initials: "YS", image: yohannesImg },
  { name: "Muaz Kibur", title: "Construction Technology Engineering Advisor", initials: "MK", image: undefined },
  { name: "Dawit Mereg", title: "Platform Architecture & Engineering Advisor", initials: "DM", image: undefined },
];

/** Circular portrait with initials fallback. */
const Avatar = ({
  initials,
  name,
  image,
  size = "lg",
}: { initials: string; name?: string; image?: string; size?: "lg" | "sm" }) => (
  <div
    className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.07] ${
      size === "lg" ? "h-24 w-24" : "h-12 w-12"
    }`}
  >
    {image ? (
      <img
        src={image}
        alt={`Portrait of ${name ?? initials}`}
        loading="lazy"
        className="h-full w-full object-cover object-top"
      />
    ) : size === "lg" ? (
      <>
        <User className="text-primary-foreground/55" size={34} strokeWidth={1.5} aria-hidden="true" />
        <span className="absolute bottom-2 text-[10px] font-bold tracking-widest text-primary-foreground/50">
          {initials}
        </span>
      </>
    ) : (
      <span className="text-xs font-bold tracking-widest text-primary-foreground/70">{initials}</span>
    )}
  </div>
);

const LeaderCard = ({ person }: { person: (typeof executives)[number] }) => (
  <article className="group flex h-full flex-col items-center rounded-2xl border border-primary-foreground/12 bg-primary-foreground/[0.05] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-primary-foreground/[0.08] hover:shadow-[0_18px_40px_-20px_hsl(var(--accent)/0.45)]">
    <div className="transition-transform duration-500 group-hover:scale-[1.04]">
      <Avatar initials={person.initials} name={person.name} image={person.image} />
    </div>

    <h3 className="mt-5 text-base font-bold leading-snug text-primary-foreground">{person.name}</h3>
    <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/70">{person.title}</p>
    {person.linkedin ? (
      <a
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${person.name} on LinkedIn`}
        className="mt-5 inline-flex min-h-11 items-center gap-2 self-center rounded-md border border-primary-foreground/20 px-3 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group-hover:border-accent/70"
      >
        <Linkedin size={15} aria-hidden="true" />
        LinkedIn
      </a>
    ) : (
      <span className="mt-5 inline-flex min-h-11 items-center gap-2 self-center rounded-md border border-primary-foreground/10 px-3 py-2 text-xs font-semibold text-primary-foreground/40">
        <Linkedin size={15} aria-hidden="true" />
        LinkedIn
      </span>
    )}
  </article>
);

/**
 * One-row horizontal carousel: slow right-to-left auto-slide, pointer drag,
 * native swipe on touch, arrows for keyboard/mouse users. Never wraps.
 */
const LeadershipRow = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, scroll: 0 });

  // Duplicated list gives a seamless loop; half of scrollWidth is one full set.
  const loop = [...executives, ...executives];

  // Slow auto-slide, wrapping at the halfway point.
  useEffect(() => {
    if (reduced || paused) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const el = trackRef.current;
      const dt = now - last;
      last = now;
      if (el && !dragging.current) {
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + (dt / 1000) * 26; // ~26px per second
        if (half > 0 && next >= half) next -= half;
        el.scrollLeft = next;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced, paused]);

  // Keep scroll position inside the first copy when the user drags/scrolls.
  const normalize = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft < 0) el.scrollLeft += half;
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // native touch scrolling
    // Don't capture links/buttons inside cards so they remain clickable.
    const target = e.target as HTMLElement;
    if (target.closest("a, button, [role='button']")) return;
    const el = trackRef.current;
    if (!el) return;
    dragging.current = true;
    dragStart.current = { x: e.clientX, scroll: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!dragging.current || !el) return;
    el.scrollLeft = dragStart.current.scroll - (e.clientX - dragStart.current.x);
    normalize();
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    dragging.current = false;
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.6, 260), behavior: "smooth" });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        role="region"
        aria-label="Leadership team, scroll horizontally"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={() => { if (!dragging.current) normalize(); }}
        className="flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain pb-2 select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((e, i) => (
          <div
            key={`${e.name}-${i}`}
            aria-hidden={i >= executives.length ? true : undefined}
            className="w-[78%] shrink-0 sm:w-[46%] lg:w-[31%] xl:w-[calc((100%-3.75rem)/5)]"
          >
            <LeaderCard person={e} />
          </div>
        ))}
      </div>

      {/* Edge fades hint at more content */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[hsl(var(--section-navy))] to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[hsl(var(--section-navy))] to-transparent" aria-hidden="true" />

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous leaders"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next leaders"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};


const AdvisorCard = ({ person }: { person: (typeof advisors)[number] }) => (
  <article className="group flex items-center gap-3.5 rounded-xl border border-primary-foreground/12 bg-primary-foreground/[0.05] p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-primary-foreground/[0.08] hover:shadow-[0_18px_40px_-20px_hsl(var(--accent)/0.35)]">
    {person.image ? (
      <img
        src={person.image}
        alt={person.name}
        className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-primary-foreground/20"
        loading="lazy"
      />
    ) : (
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold tracking-widest text-accent ring-1 ring-accent/20"
        role="img"
        aria-label={`Placeholder portrait for ${person.name}`}
      >
        {person.initials}
      </div>
    )}
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2">
        <h3 className="truncate text-sm font-bold text-primary-foreground">{person.name}</h3>
        <span className="shrink-0 rounded border border-accent/35 bg-accent/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
          Prospective
        </span>
      </div>
      <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-primary-foreground/70">{person.title}</p>
    </div>
  </article>
);


const Leadership = () => {
  const reduced = useReducedMotion();

  return (
    <>
      <Seo
        title="Leadership | AlikoTech"
        description="Meet the executive team and strategic advisors leading AlikoTech and the development of Alikore."
        path="/leadership"
      />
      <Navbar />
      <main>
        {/* Hero + one horizontal leadership row on a single dark navy canvas */}
        <section className="relative overflow-hidden section-navy-bg">
          <div className="absolute inset-0 blueprint-grid-dark opacity-60" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden="true"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--accent) / 0.35) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(70% 60% at 70% 20%, black, transparent 75%)",
              WebkitMaskImage: "radial-gradient(70% 60% at 70% 20%, black, transparent 75%)",
            }}
          />
          {!reduced && (
            <motion.div
              className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          <div className="container-max relative z-10 pb-16 pt-24 sm:pt-28">
            <Reveal className="max-w-2xl">
              <span className="eyebrow text-accent">Leadership</span>
              <h1 className="mt-5 display-1 text-primary-foreground">The leaders building AlikoTech</h1>
              <p className="mt-5 body-lg text-primary-foreground/85">
                Experienced builders, operators, and engineers united by a mission to transform construction in
                Africa through technology.
              </p>
            </Reveal>

            <div className="mt-12">
              <LeadershipRow />
            </div>
          </div>
        </section>

        {/* Strategic advisors on the same dark navy canvas as the executive row */}
        <section className="relative overflow-hidden section-navy-bg">
          <div className="absolute inset-0 blueprint-grid-dark opacity-40" aria-hidden="true" />
          <div className="container-max relative z-10 pb-16 pt-16 sm:pt-20">
            <Reveal className="max-w-2xl">
              <span className="eyebrow text-accent">Advisory</span>
              <h2 className="mt-4 display-2 text-primary-foreground">Our Strategic Advisory People</h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
                A focused network built for defined contribution, active participation, and explicit consent.
                All names below are prospective advisors serving in their individual capacity.
              </p>
            </Reveal>

            <RevealGroup
              as="ul"
              className="mt-6 flex flex-nowrap gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
            >
              {advisors.map((a) => (
                <RevealItem
                  key={a.name}
                  as="li"
                  className="w-[85%] shrink-0 snap-start md:w-auto"
                >
                  <AdvisorCard person={a} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Leadership;
