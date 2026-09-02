import { useState } from "react";
import { useInspections, useCreateInspection, useUpdateInspection, useDeleteInspection } from "@/hooks/use-inspections";
import { useAuth } from "@/contexts/AuthContext";
import { hasPermission } from "@/lib/rbac";
import StatusBadge from "@/components/shared/StatusBadge";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
import InspectionFormDialog from "./InspectionFormDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, ClipboardCheck, Plus, Trash2, Pencil, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { InspectionFormData } from "@/lib/validations";
import type { Inspection, InspectionChecklistItem } from "@/types";

const InspectionsPage = () => {
  const { data: inspections, isLoading, isError, refetch } = useInspections();
  const { user } = useAuth();
  const createInspection = useCreateInspection();
  const updateInspection = useUpdateInspection();
  const deleteInspection = useDeleteInspection();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Inspection | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // Inline checklist editing
  const [editingChecklist, setEditingChecklist] = useState<string | null>(null);
  const [localChecklist, setLocalChecklist] = useState<InspectionChecklistItem[]>([]);

  const canCreate = hasPermission(user?.role ?? null, "inspection:create");
  const canUpdate = hasPermission(user?.role ?? null, "inspection:update");

  const handleSubmit = (data: InspectionFormData) => {
    if (editItem) {
      updateInspection.mutate({ id: editItem.id, data }, {
        onSuccess: () => { setShowForm(false); setEditItem(null); toast({ title: "Inspection updated" }); },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      });
    } else {
      createInspection.mutate(data, {
        onSuccess: () => { setShowForm(false); toast({ title: "Inspection scheduled" }); },
        onError: () => toast({ title: "Failed to create", variant: "destructive" }),
      });
    }
  };

  const toggleChecklistItem = (index: number) => {
    setLocalChecklist((prev) =>
      prev.map((item, i) => i === index ? { ...item, passed: !item.passed } : item)
    );
  };

  const saveChecklist = (inspectionId: string) => {
    updateInspection.mutate(
      { id: inspectionId, data: { checklist: localChecklist } as any },
      {
        onSuccess: () => { setEditingChecklist(null); toast({ title: "Checklist updated" }); },
        onError: () => toast({ title: "Failed to save checklist", variant: "destructive" }),
      }
    );
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteInspection.mutate(deleteId, {
      onSuccess: () => { setDeleteId(null); toast({ title: "Inspection deleted" }); },
      onError: () => toast({ title: "Failed to delete", variant: "destructive" }),
    });
  };

  if (isLoading) return <PageSkeleton rows={4} />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inspections</h2>
          <p className="text-sm text-muted-foreground">{inspections?.length ?? 0} inspection{(inspections?.length ?? 0) !== 1 && "s"}</p>
        </div>
        {canCreate && (
          <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="gap-2">
            <Plus size={16} /> Schedule Inspection
          </Button>
        )}
      </div>

      {!inspections?.length ? (
        <EmptyState title="No inspections" description="No inspections scheduled." />
      ) : (
        <div className="space-y-3">
          {inspections.map((inspection) => (
            <Card key={inspection.id} className="group relative transition-all hover:border-accent/50">
              <CardHeader className="flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="text-sm font-medium">{inspection.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <StatusBadge status={inspection.status} />
                  {canUpdate && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-accent hover:bg-accent/10" onClick={() => { setEditItem(inspection); setShowForm(true); }}>
                      <Pencil size={13} />
                    </Button>
                  )}
                  {canCreate && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(inspection.id)}>
                      <Trash2 size={13} />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={11} />{new Date(inspection.scheduledDate).toLocaleDateString()}</span>
                  {inspection.checklist && (
                    <span className="flex items-center gap-1">
                      <ClipboardCheck size={11} />
                      {inspection.checklist.filter((c) => c.passed === true).length}/{inspection.checklist.length} passed
                    </span>
                  )}
                </div>

                {/* Inline checklist editing for Contractor/Admin */}
                {inspection.checklist && inspection.checklist.length > 0 && (
                  editingChecklist === inspection.id ? (
                    <div className="space-y-2 rounded-lg border border-border p-3">
                      <p className="text-xs font-medium text-foreground">Checklist</p>
                      {localChecklist.map((item, i) => (
                        <label key={item.id} className="flex items-center gap-2 text-xs cursor-pointer">
                          <Checkbox checked={item.passed === true} onCheckedChange={() => toggleChecklistItem(i)} />
                          <span className={item.passed ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                        </label>
                      ))}
                      <div className="flex gap-2 pt-1">
                        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => saveChecklist(inspection.id)} disabled={updateInspection.isPending}>
                          <Save size={12} /> Save
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingChecklist(null)}>Cancel</Button>
                      </div>
                    </div>
                  ) : canUpdate ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1.5"
                      onClick={() => { setEditingChecklist(inspection.id); setLocalChecklist([...inspection.checklist!]); }}
                    >
                      <ClipboardCheck size={12} /> Edit Checklist
                    </Button>
                  ) : null
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <InspectionFormDialog open={showForm} onOpenChange={(o) => { setShowForm(o); if (!o) setEditItem(null); }} onSubmit={handleSubmit} loading={createInspection.isPending || updateInspection.isPending} initial={editItem} />
      <ConfirmDelete open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={handleDelete} title="Delete inspection" loading={deleteInspection.isPending} />
    </div>
  );
};

export default InspectionsPage;
