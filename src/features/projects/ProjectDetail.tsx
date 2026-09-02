import { useParams, Link } from "react-router-dom";
import { useProject, useUpdateProjectProgress } from "@/hooks/use-projects";
import { useTasks } from "@/hooks/use-tasks";
import { useContracts } from "@/hooks/use-contracts";
import { useInspections } from "@/hooks/use-inspections";
import { useAuth } from "@/contexts/AuthContext";
import { hasPermission } from "@/lib/rbac";
import StatusBadge from "@/components/shared/StatusBadge";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Calendar, ArrowRight, ClipboardList, FileText, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError, refetch } = useProject(id!);
  const { data: tasks = [] } = useTasks(id);
  const { data: contracts = [] } = useContracts(id);
  const { data: inspections = [] } = useInspections(id);
  const { user } = useAuth();
  const updateProgress = useUpdateProjectProgress();
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    if (project) setLocalProgress(project.progress);
  }, [project]);

  if (isLoading) return <PageSkeleton rows={6} />;
  if (isError || !project) return <ErrorState onRetry={refetch} />;

  const canUpdate = hasPermission(user?.role ?? null, "project:update");

  const handleSaveProgress = () => {
    updateProgress.mutate(
      { id: project.id, progress: localProgress },
      {
        onSuccess: () => toast({ title: "Progress updated" }),
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      }
    );
  };

  return (
    <div className="space-y-6">
      <Link
        to="/dashboard/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} /> Back to Projects
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{project.title}</h2>
          <p className="mt-1 text-muted-foreground">{project.description}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Progress value={localProgress} className="h-3 flex-1 mr-4" />
              <span className="text-lg font-bold text-foreground">{localProgress}%</span>
            </div>
            {canUpdate && (
              <div className="space-y-3">
                <Slider value={[localProgress]} onValueChange={([v]) => setLocalProgress(v)} max={100} step={1} />
                <Button size="sm" onClick={handleSaveProgress} disabled={localProgress === project.progress || updateProgress.isPending}>
                  {updateProgress.isPending ? "Saving…" : "Save Progress"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={project.status} />
            </div>
            {project.startDate && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Timeline</span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <Calendar size={12} />
                  {new Date(project.startDate).toLocaleDateString()}
                  {project.endDate && (
                    <>
                      <ArrowRight size={10} />
                      {new Date(project.endDate).toLocaleDateString()}
                    </>
                  )}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Visible to Client</span>
              <span className="text-foreground">{project.isVisibleToClient ? "Yes" : "No"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project-scoped tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks" className="gap-1.5">
            <ClipboardList size={14} /> Tasks ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-1.5">
            <FileText size={14} /> Contracts ({contracts.length})
          </TabsTrigger>
          <TabsTrigger value="inspections" className="gap-1.5">
            <Search size={14} /> Inspections ({inspections.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          {tasks.length === 0 ? (
            <EmptyState title="No tasks" description="No tasks found for this project." />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.title}</TableCell>
                        <TableCell><StatusBadge status={t.status} /></TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={t.progress} className="h-2 w-20" />
                            <span className="text-xs text-muted-foreground">{t.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="contracts">
          {contracts.length === 0 ? (
            <EmptyState title="No contracts" description="No contracts found for this project." />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Period</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.title}</TableCell>
                        <TableCell><StatusBadge status={c.status} /></TableCell>
                        <TableCell>{c.value ? `$${c.value.toLocaleString()}` : "—"}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {c.startDate ? new Date(c.startDate).toLocaleDateString() : "—"}
                          {c.endDate && ` → ${new Date(c.endDate).toLocaleDateString()}`}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inspections">
          {inspections.length === 0 ? (
            <EmptyState title="No inspections" description="No inspections found for this project." />
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Checklist</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inspections.map((i) => (
                      <TableRow key={i.id}>
                        <TableCell className="font-medium">{i.title}</TableCell>
                        <TableCell><StatusBadge status={i.status} /></TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(i.scheduledDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {i.checklist ? `${i.checklist.filter((c) => c.passed).length}/${i.checklist.length} passed` : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
