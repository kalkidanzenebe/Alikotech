import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import alikoLogo from "@/assets/alikotech-logo.png";
import heroBg from "@/assets/construction-skyline.jpg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand / story panel */}
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
              From AlikoTech to Alikore: project control, live.
            </h2>
            <p className="mt-4 body-lg text-primary-foreground/85">
              Sign in to manage projects, tasks, contracts, and inspections on
              Alikore, AlikoTech's construction project control platform.
            </p>
          </div>
          <p className="text-xs text-primary-foreground/60">
            &copy; {new Date().getFullYear()} AlikoHub LLC d/b/a AlikoTech
          </p>
        </div>
      </div>

      {/* Auth card */}
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

        <div className="relative z-10 w-full max-w-md">
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
              <h1 className="display-3 text-foreground lg:text-foreground">
                Welcome back
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to the Alikore platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full bg-accent text-accent-foreground shadow-accent/20 hover:bg-accent/90"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Don't have an account? Contact your administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
