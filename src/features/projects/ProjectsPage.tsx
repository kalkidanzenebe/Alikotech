import { useState } from "react";
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/use-projects";
import { useAuth } from "@/contexts/AuthContext";
import { canSee, hasPermission } from "@/lib/rbac";
import StatusBadge from "@/components/shared/StatusBadge";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
import ProjectFormDialog from "./ProjectFormDialog";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ProjectFormData } from "@/lib/validations";
import type { Project } from "@/types";

const ProjectsPage = () => {
  const { data: projects, isLoading, isError, refetch } = useProjects();
  const { user } = useAuth();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const canCreate = hasPermission(user?.role ?? null, "project:create");
  const canUpdate = hasPermission(user?.role ?? null, "project:update");
  const canDelete = hasPermission(user?.role ?? null, "project:delete");

  const handleSubmit = (data: ProjectFormData) => {
    if (editItem) {
      updateProject.mutate({ id: editItem.id, data }, {
        onSuccess: () => { setShowForm(false); setEditItem(null); toast({ title: "Project updated" }); },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      });
    } else {
      createProject.mutate(data, {
        onSuccess: () => { setShowForm(false); toast({ title: "Project created" }); },
        onError: () => toast({ title: "Failed to create", variant: "destructive" }),
      });
    }
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteProject.mutate(deleteId, {
      onSuccess: () => { setDeleteId(null); toast({ title: "Project deleted" }); },
      onError: () => toast({ title: "Failed to delete", variant: "destructive" }),
    });
  };

  const openEdit = (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditItem(project);
    setShowForm(true);
  };

  if (isLoading) return <PageSkeleton rows={4} />;
  if (isError) return <ErrorState onRetry={refetch} />;

  const visibleProjects = (projects || []).filter((p) => canSee(user?.role ?? null, p.isVisibleToClient));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">{visibleProjects.length} project{visibleProjects.length !== 1 && "s"}</p>
        </div>
        {canCreate && (
          <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="gap-2">
            <Plus size={16} /> New Project
          </Button>
        )}
      </div>

      {visibleProjects.length === 0 ? (
        <EmptyState title="No projects" description="No projects available yet." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <div key={project.id} className="relative group">
              <Link to={`/dashboard/projects/${project.id}`}>
                <Card className="transition-all hover:border-accent/50 hover:shadow-md h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug line-clamp-2">{project.title}</CardTitle>
                      <StatusBadge status={project.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span className="font-medium text-foreground">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    {project.startDate && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        <span>{new Date(project.startDate).toLocaleDateString()}</span>
                        {project.endDate && (<><ArrowRight size={10} /><span>{new Date(project.endDate).toLocaleDateString()}</span></>)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
              {/* Action buttons */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {canUpdate && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-accent/10 text-accent" onClick={(e) => openEdit(project, e)}>
                    <Pencil size={13} />
                  </Button>
                )}
                {canDelete && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 bg-background/80 backdrop-blur-sm text-destructive hover:bg-destructive/10" onClick={(e) => { e.preventDefault(); setDeleteId(project.id); }}>
                    <Trash2 size={13} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectFormDialog
        open={showForm}
        onOpenChange={(o) => { setShowForm(o); if (!o) setEditItem(null); }}
        onSubmit={handleSubmit}
        loading={createProject.isPending || updateProject.isPending}
        initial={editItem}
      />
      <ConfirmDelete open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={handleDelete} title="Delete project" description="This will permanently delete this project and all associated data." loading={deleteProject.isPending} />
    </div>
  );
};

export default ProjectsPage;
