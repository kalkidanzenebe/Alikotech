import { Outlet, useLocation, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import DashboardStats from "@/features/dashboard/DashboardStats";
import { ChevronRight } from "lucide-react";

const segmentLabels: Record<string, string> = {
  projects: "Projects",
  tasks: "Tasks",
  contracts: "Contracts",
  inspections: "Inspections",
  users: "Users",
};

const DashboardLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/dashboard";

  const segment = location.pathname.split("/dashboard/")[1]?.split("/")[0];
  const segmentLabel = segment ? segmentLabels[segment] || segment : undefined;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top header */}
          <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger />
            <div className="h-5 w-px bg-border" aria-hidden="true" />
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
              <Link
                to="/dashboard"
                className="font-semibold text-foreground transition-colors hover:text-accent"
              >
                Dashboard
              </Link>
              {segmentLabel && (
                <>
                  <ChevronRight size={14} aria-hidden="true" className="text-muted-foreground/60" />
                  <span aria-current="page" className="font-medium text-muted-foreground">
                    {segmentLabel}
                  </span>
                </>
              )}
            </nav>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              {isHome ? <DashboardStats /> : <Outlet />}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
