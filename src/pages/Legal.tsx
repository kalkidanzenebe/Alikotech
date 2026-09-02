import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { offices } from "@/lib/company";
import {
  legalEffective,
  legalEmail,
  legalUpdated,
  privacySections,
  termsSections,
} from "@/lib/legal";

interface LegalProps {
  kind: "privacy" | "terms";
}

const Legal = ({ kind }: LegalProps) => {
  const isPrivacy = kind === "privacy";
  const sections = isPrivacy ? privacySections : termsSections;
  const heading = isPrivacy ? "Privacy Policy" : "Terms of Service";

  const toc = (
    <ul className="space-y-1.5 text-sm">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="block py-1 text-muted-foreground transition-colors hover:text-accent">
            {i + 1}. {s.title}
          </a>
        </li>
      ))}
      <li>
        <a href="#contact" className="block py-1 text-muted-foreground transition-colors hover:text-accent">
          {sections.length + 1}. Contact
        </a>
      </li>
    </ul>
  );

  return (
    <>
      <Seo
        title={isPrivacy ? "Privacy Policy | AlikoTech" : "Terms of Service | AlikoTech"}
        description={
          isPrivacy
            ? "How AlikoTech, the construction technology business of AlikoHub LLC, handles personal information across its websites and the Alikore platform."
            : "The terms that govern use of AlikoTech websites, software, and the Alikore construction project control platform."
        }
        path={isPrivacy ? "/privacy" : "/terms"}
      />
      <Navbar />
      <main className="bg-background">
        <section className="section-y-tight">
          <div className="container-max">
            <div className="max-w-prose">
              <span className="eyebrow">Legal</span>
              <h1 className="mt-4 display-2 text-foreground">AlikoTech {heading}</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Effective Date: {legalEffective} · Last Updated: {legalUpdated}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {isPrivacy
                  ? "This page covers privacy only. For the rules that govern use of our websites and software, see the Terms of Service."
                  : "This page covers the terms of use only. For how we handle personal information, see the Privacy Policy."}
              </p>

              <nav aria-label="Legal documents" className="mt-6 inline-flex rounded-lg border border-border bg-card p-1">
                <Link
                  to="/privacy"
                  aria-current={isPrivacy ? "page" : undefined}
                  className={`min-h-[44px] rounded-md px-4 py-2 text-sm font-semibold leading-[28px] transition-colors ${
                    isPrivacy
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  aria-current={!isPrivacy ? "page" : undefined}
                  className={`min-h-[44px] rounded-md px-4 py-2 text-sm font-semibold leading-[28px] transition-colors ${
                    !isPrivacy
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Terms of Service
                </Link>
              </nav>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
              <aside className="lg:order-1 lg:hidden">
                <details className="rounded-lg border border-border bg-card p-4">
                  <summary className="cursor-pointer text-sm font-bold text-foreground">
                    On this page ({sections.length + 1} sections)
                  </summary>
                  <div className="mt-3">{toc}</div>
                </details>
              </aside>

              <aside className="hidden lg:order-1 lg:block">
                <nav aria-label="On this page" className="sticky top-28">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    On this page
                  </p>
                  {toc}
                </nav>
              </aside>

              <div className="max-w-prose space-y-10 lg:order-2">
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                      {i + 1}. {s.title}
                    </h2>
                    <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                      {s.body?.map((p) => <p key={p}>{p}</p>)}
                      {s.list && (
                        <ul className="ml-5 list-disc space-y-1.5">
                          {s.list.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      )}
                      {s.after?.map((p) => <p key={p}>{p}</p>)}
                    </div>
                  </section>
                ))}

                <section id="contact" className="scroll-mt-28">
                  <h2 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                    {sections.length + 1}. Contact
                  </h2>
                  <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                    <p className="font-semibold text-foreground">AlikoHub LLC d/b/a AlikoTech</p>
                    {offices.map((o) => (
                      <p key={o.label}>
                        <span className="font-semibold text-foreground">{o.label} Office: </span>
                        {o.address}
                      </p>
                    ))}
                    <p>
                      Email:{" "}
                      <a href={`mailto:${legalEmail}`} className="font-semibold text-accent">
                        {legalEmail}
                      </a>
                    </p>
                  </div>
                </section>

                <div className="space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
                  <p>
                    Questions about these terms or your information?{" "}
                    <Link to="/contact" className="font-semibold text-accent">Contact AlikoTech</Link>.
                  </p>
                  <p>
                    {isPrivacy ? "Looking for the terms of use? " : "Looking for our privacy practices? "}
                    <Link to={isPrivacy ? "/terms" : "/privacy"} className="font-semibold text-accent">
                      {isPrivacy ? "Read the Terms of Service" : "Read the Privacy Policy"}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Legal;
