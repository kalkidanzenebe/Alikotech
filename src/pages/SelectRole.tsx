import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api-client";
import { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Shield, HardHat, User } from "lucide-react";
import alikoLogo from "@/assets/alikotech-logo.png";
import heroBg from "@/assets/africa-skyline.jpg";

const roles = [
  {
    value: UserRole.ADMIN,
    label: "Admin",
    description: "Full platform access: manage projects, users, and settings",
    icon: Shield,
  },
  {
    value: UserRole.CONTRACTOR,
    label: "Contractor",
    description: "Update progress, manage tasks, and view contracts",
    icon: HardHat,
  },
  {
    value: UserRole.CLIENT,
    label: "Client",
    description: "View project progress, documents, and approved reports",
    icon: User,
  },
];

const SelectRole = () => {
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await api.post("/profile/role", { role: selected });
      await refreshProfile();
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast({
        title: "Failed to set role",
        description: err?.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 overlay-navy" />
          <div
            aria-hidden="true"
            className="absolute inset-0 blueprint-grid-dark mask-fade-edges"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link to="/">
            <img
              src={alikoLogo}
              alt="AlikoTech"
              className="h-10 object-contain"
            />
          </Link>
          <div className="max-w-md">
            <span className="eyebrow text-primary-foreground">
              Alikore Platform
            </span>
            <h2 className="mt-4 display-2 text-primary-foreground">
              One account, the right view.
            </h2>
            <p className="mt-4 body-lg text-primary-foreground/85">
              Alikore tailors the dashboard to how you work: admin, contractor,
              or client.
            </p>
          </div>
          <p className="text-xs text-primary-foreground/60">
            &copy; {new Date().getFullYear()} AlikoHub LLC d/b/a AlikoTech
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden bg-background px-6 py-16">
        <div className="absolute inset-0 lg:hidden">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 overlay-navy" />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="card-premium-dark border border-border/40 bg-card/95 p-8 backdrop-blur-xl lg:border-border lg:bg-card lg:shadow-none">
            <div className="mb-6 text-center lg:hidden">
              <Link to="/">
                <img
                  src={alikoLogo}
                  alt="AlikoTech"
                  className="mx-auto mb-4 h-14 object-contain"
                />
              </Link>
            </div>
            <div className="mb-6 text-center">
              <h1 className="display-3 text-foreground">Select Your Role</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose how you'll use the platform
              </p>
            </div>

            <div className="space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = selected === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelected(role.value)}
                    aria-pressed={isActive}
                    className={`flex min-h-[44px] w-full items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      isActive
                        ? "border-accent bg-accent/10"
                        : "border-border bg-secondary/40 hover:border-accent/40 hover:bg-secondary/70"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {role.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {role.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selected || loading}
              className="mt-6 h-12 w-full bg-accent text-accent-foreground shadow-accent/20 hover:bg-accent/90"
              size="lg"
            >
              {loading ? "Setting role…" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
