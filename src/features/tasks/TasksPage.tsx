import { useState } from "react";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/use-tasks";
import { useAuth } from "@/contexts/AuthContext";
import { hasPermission } from "@/lib/rbac";
import StatusBadge from "@/components/shared/StatusBadge";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
import TaskFormDialog from "./TaskFormDialog";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Trash2, Pencil, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { TaskFormData } from "@/lib/validations";
import type { Task } from "@/types";

const TasksPage = () => {
  const { data: tasks, isLoading, isError, refetch } = useTasks();
  const { user } = useAuth();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // Inline progress editing for Contractor
  const [editingProgress, setEditingProgress] = useState<string | null>(null);
  const [localProgress, setLocalProgress] = useState(0);

  const canCreate = hasPermission(user?.role ?? null, "task:create");
  const canUpdate = hasPermission(user?.role ?? null, "task:update");

  const handleSubmit = (data: TaskFormData) => {
    if (editItem) {
      updateTask.mutate({ id: editItem.id, data }, {
        onSuccess: () => { setShowForm(false); setEditItem(null); toast({ title: "Task updated" }); },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      });
    } else {
      createTask.mutate(data, {
        onSuccess: () => { setShowForm(false); toast({ title: "Task created" }); },
        onError: () => toast({ title: "Failed to create", variant: "destructive" }),
      });
    }
  };

  const handleSaveProgress = (taskId: string) => {
    updateTask.mutate({ id: taskId, data: { progress: localProgress } as any }, {
      onSuccess: () => { setEditingProgress(null); toast({ title: "Progress updated" }); },
      onError: () => toast({ title: "Failed to update", variant: "destructive" }),
    });
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteTask.mutate(deleteId, {
      onSuccess: () => { setDeleteId(null); toast({ title: "Task deleted" }); },
      onError: () => toast({ title: "Failed to delete", variant: "destructive" }),
    });
  };

  if (isLoading) return <PageSkeleton rows={5} />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
          <p className="text-sm text-muted-foreground">{tasks?.length ?? 0} task{(tasks?.length ?? 0) !== 1 && "s"}</p>
        </div>
        {canCreate && (
          <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="gap-2">
            <Plus size={16} /> New Task
          </Button>
        )}
      </div>

      {!tasks?.length ? (
        <EmptyState title="No tasks" description="No tasks assigned yet." />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card key={task.id} className="group relative transition-all hover:border-accent/50">
              <CardHeader className="flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="text-sm font-medium leading-snug">{task.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <StatusBadge status={task.status} />
                  {canUpdate && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-accent hover:bg-accent/10" onClick={() => { setEditItem(task); setShowForm(true); }}>
                      <Pencil size={13} />
                    </Button>
                  )}
                  {canCreate && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(task.id)}>
                      <Trash2 size={13} />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {task.description && <p className="line-clamp-2 text-xs text-muted-foreground">{task.description}</p>}

                {/* Inline progress editing */}
                {editingProgress === task.id && canUpdate ? (
                  <div className="flex items-center gap-3">
                    <Slider value={[localProgress]} onValueChange={([v]) => setLocalProgress(v)} max={100} step={1} className="flex-1" />
                    <span className="text-xs font-bold text-foreground w-10 text-right">{localProgress}%</span>
                    <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => handleSaveProgress(task.id)} disabled={updateTask.isPending}>
                      <Save size={12} /> Save
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingProgress(null)}>Cancel</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex-1 space-y-1 ${canUpdate ? "cursor-pointer" : ""}`}
                      onClick={() => { if (canUpdate) { setEditingProgress(task.id); setLocalProgress(task.progress); } }}
                    >
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress {canUpdate && <span className="text-accent/70">(click to edit)</span>}</span>
                        <span className="font-medium text-foreground">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-1.5" />
                    </div>
                    {task.dueDate && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <Calendar size={11} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <TaskFormDialog open={showForm} onOpenChange={(o) => { setShowForm(o); if (!o) setEditItem(null); }} onSubmit={handleSubmit} loading={createTask.isPending || updateTask.isPending} initial={editItem} />
      <ConfirmDelete open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={handleDelete} title="Delete task" loading={deleteTask.isPending} />
    </div>
  );
};

export default TasksPage;
