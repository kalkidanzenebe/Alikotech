import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { useProjects } from "@/hooks/use-projects";
import { useTasks } from "@/hooks/use-tasks";
import { useContracts } from "@/hooks/use-contracts";
import { useInspections } from "@/hooks/use-inspections";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderKanban, ListTodo, FileText, ClipboardCheck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { canSee } from "@/lib/rbac";

const DashboardStats = () => {
  const { user } = useAuth();
  const { data: projects, isLoading: pLoading } = useProjects();
  const { data: tasks, isLoading: tLoading } = useTasks();
  const { data: contracts, isLoading: cLoading } = useContracts();
  const { data: inspections, isLoading: iLoading } = useInspections();

  const role = user?.role ?? null;
  const showTasks = role === UserRole.ADMIN || role === UserRole.CONTRACTOR;
  const showInspections = showTasks;

  const visibleProjects = (projects || []).filter((p) => canSee(role, p.isVisibleToClient));
  const activeProjects = visibleProjects.filter((p) => p.status === "ACTIVE").length;
  const avgProgress = visibleProjects.length
    ? Math.round(visibleProjects.reduce((sum, p) => sum + p.progress, 0) / visibleProjects.length)
    : 0;

  const stats = [
    { label: "Total Projects", value: visibleProjects.length, sub: `${activeProjects} active`, icon: FolderKanban, href: "/dashboard/projects", loading: pLoading, show: true },
    { label: "Tasks", value: tasks?.length ?? 0, sub: `${tasks?.filter((t) => t.status === "IN_PROGRESS").length ?? 0} in progress`, icon: ListTodo, href: "/dashboard/tasks", loading: tLoading, show: showTasks },
    { label: "Contracts", value: contracts?.length ?? 0, sub: `${contracts?.filter((c) => c.status === "PENDING_APPROVAL").length ?? 0} pending`, icon: FileText, href: "/dashboard/contracts", loading: cLoading, show: true },
    { label: "Inspections", value: inspections?.length ?? 0, sub: `${inspections?.filter((i) => i.status === "SCHEDULED").length ?? 0} scheduled`, icon: ClipboardCheck, href: "/dashboard/inspections", loading: iLoading, show: showInspections },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome, {user?.name || "User"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Signed in as <span className="font-semibold text-accent">{user?.role}</span>
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.filter((s) => s.show).map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} to={stat.href}>
              <Card className="group transition-all hover:border-accent/40 hover:shadow-md">
                <CardHeader className="flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <Icon size={16} className="text-accent" />
                </CardHeader>
                <CardContent>
                  {stat.loading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.sub}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Average progress */}
      {!pLoading && visibleProjects.length > 0 && (
        <Card>
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <TrendingUp size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Average Project Progress</p>
              <p className="text-2xl font-bold text-accent">{avgProgress}%</p>
            </div>
            <div className="ml-auto h-2 w-32 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${avgProgress}%` }} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardStats;
