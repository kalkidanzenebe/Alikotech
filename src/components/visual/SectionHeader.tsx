import { type ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}

/** Consistent eyebrow / headline / one-line intro block used across sections. */
const SectionHeader = ({ eyebrow, title, intro, dark, align = "left", className = "" }: SectionHeaderProps) => (
  <Reveal className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2 className={`mt-4 display-2 ${dark ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2>
    {intro && (
      <p className={`mt-4 body-lg ${dark ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{intro}</p>
    )}
  </Reveal>
);

export default SectionHeader;
