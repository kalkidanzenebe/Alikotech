import { useState, useId } from "react";
import { Mail, MapPin, ArrowUpRight, User, Building2, Globe, Phone, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { alikore } from "@/lib/alikore";
import { offices } from "@/lib/company";
import { legalEmail } from "@/lib/legal";
import Reveal from "@/components/visual/Reveal";

const inquiryTypes = [
  "General Inquiry",
  "Partnership",
  "Alikore / Product",
  "Pilot Program",
  "Careers",
  "Media",
  "Other",
];

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  inquiry: string;
  message: string;
}

const emptyForm: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  inquiry: "",
  message: "",
};

const fieldShell =
  "h-11 pl-10 transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25";

const Contact = () => {
  const [form, setForm] = useState<ContactFormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const formId = useId();

  const set = (key: keyof ContactFormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof ContactFormState, string>> = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.inquiry) next.inquiry = "Select an inquiry type.";
    if (!form.message.trim()) next.message = "Add a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /**
   * Simulated submit. TODO: replace the setTimeout below with a real API call
   * (e.g. `await api.post("/contact", form)`) once a backend endpoint exists.
   */
  const submitContactRequest = async (data: ContactFormState) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ok: true, data };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({ title: "Please fix the highlighted fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submitContactRequest(form);
      toast({
        title: "Message saved",
        description: "This form isn't connected to a backend yet, so nothing was sent. We'll follow up once it is.",
      });
      setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (key: keyof ContactFormState) => errors[key];
  const errorText = (key: keyof ContactFormState) =>
    fieldError(key) ? (
      <p id={`${formId}-${key}-error`} className="text-xs font-medium text-destructive">
        {fieldError(key)}
      </p>
    ) : null;

  const iconClass = "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground";

  return (
    <>
      <Seo
        title="Contact AlikoTech"
        description="Contact AlikoTech about partnerships, careers, company inquiries, and Alikore."
        path="/contact"
      />
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        {/* Extremely subtle blueprint / contour treatment */}
        <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.25]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 85% 0%, hsl(var(--accent) / 0.18) 0 1px, transparent 1px 46px)",
          }}
        />

        <section className="container-max relative z-10 pb-20 pt-24 sm:pt-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-accent">Contact</span>
            <h1 className="mt-4 display-1 text-foreground">Let's build together.</h1>
            <p className="mt-4 body-lg text-muted-foreground">
              Have a question, want to explore a partnership, or interested in Alikore? We'd love to hear from you.
            </p>
          </Reveal>

          {/* Compact contact information bar */}
          <Reveal delay={0.08} className="mx-auto mt-8 max-w-3xl">
            <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card/70 backdrop-blur-sm sm:flex-row sm:divide-x sm:divide-y-0">
              <li className="flex items-center gap-3 px-5 py-4 sm:flex-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
                  <Mail size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Email Us
                  </span>
                  <a href={`mailto:${legalEmail}`} className="block truncate text-sm font-semibold text-foreground hover:text-accent">
                    {legalEmail}
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3 px-5 py-4 sm:flex-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent">
                  <MapPin size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Our Offices
                  </span>
                  <span className="block text-sm font-semibold text-foreground">SeaTac, WA · Addis Ababa, ET</span>
                </span>
              </li>
            </ul>
          </Reveal>

          {/* Form: the visual focus */}
          <Reveal delay={0.14} className="mx-auto mt-8 max-w-3xl">
            <form onSubmit={handleSubmit} noValidate className="card-premium space-y-6 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-name`}>Full Name *</Label>
                  <div className="relative">
                    <User size={16} className={iconClass} aria-hidden="true" />
                    <Input
                      id={`${formId}-name`}
                      required
                      placeholder="Enter your full name"
                      className={fieldShell}
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      aria-invalid={!!fieldError("name")}
                      aria-describedby={fieldError("name") ? `${formId}-name-error` : undefined}
                    />
                  </div>
                  {errorText("name")}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${formId}-email`}>Email *</Label>
                  <div className="relative">
                    <Mail size={16} className={iconClass} aria-hidden="true" />
                    <Input
                      id={`${formId}-email`}
                      type="email"
                      required
                      placeholder="Enter your email"
                      className={fieldShell}
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      aria-invalid={!!fieldError("email")}
                      aria-describedby={fieldError("email") ? `${formId}-email-error` : undefined}
                    />
                  </div>
                  {errorText("email")}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${formId}-phone`}>Phone</Label>
                  <div className="relative">
                    <Phone size={16} className={iconClass} aria-hidden="true" />
                    <Input
                      id={`${formId}-phone`}
                      placeholder="Enter your phone number"
                      className={fieldShell}
                      value={form.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${formId}-company`}>Company</Label>
                  <div className="relative">
                    <Building2 size={16} className={iconClass} aria-hidden="true" />
                    <Input
                      id={`${formId}-company`}
                      placeholder="Enter your company"
                      className={fieldShell}
                      value={form.company}
                      onChange={(e) => set("company")(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${formId}-country`}>Country</Label>
                  <div className="relative">
                    <Globe size={16} className={iconClass} aria-hidden="true" />
                    <Input
                      id={`${formId}-country`}
                      placeholder="Select your country"
                      className={fieldShell}
                      value={form.country}
                      onChange={(e) => set("country")(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${formId}-inquiry`}>Inquiry Type *</Label>
                  <Select value={form.inquiry} onValueChange={set("inquiry")}>
                    <SelectTrigger
                      id={`${formId}-inquiry`}
                      className="h-11 transition-colors focus:border-accent focus:ring-2 focus:ring-accent/25"
                      aria-invalid={!!fieldError("inquiry")}
                      aria-describedby={fieldError("inquiry") ? `${formId}-inquiry-error` : undefined}
                    >
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errorText("inquiry")}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${formId}-message`}>Message *</Label>
                <Textarea
                  id={`${formId}-message`}
                  required
                  rows={7}
                  placeholder="Tell us how we can help..."
                  className="min-h-[160px] transition-colors focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25"
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  aria-invalid={!!fieldError("message")}
                  aria-describedby={fieldError("message") ? `${formId}-message-error` : undefined}
                />
                {errorText("message")}
              </div>

              {/* Compact pilot invitation */}
              <div className="flex items-start gap-3 rounded-lg border border-accent/25 bg-accent/[0.06] p-4">
                <Sparkles size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-foreground">
                  <span className="font-bold">Interested in piloting Alikore?</span>{" "}
                  <span className="text-muted-foreground">Let us know in your message.</span>
                  {form.inquiry === "Pilot Program" && (
                    <a
                      href={alikore.pilot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                    >
                      Apply through the Alikore Pilot Program form
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </p>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-12 w-full bg-accent px-8 text-accent-foreground transition-transform hover:-translate-y-0.5 hover:bg-accent/90 sm:w-auto"
              >
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </Reveal>

          {/* Office detail, compact */}
          <Reveal delay={0.2} className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {offices.map((o) => (
              <div key={o.label} className="rounded-xl border border-border bg-card/70 p-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{o.label}</span>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{o.address}</p>
              </div>
            ))}
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
