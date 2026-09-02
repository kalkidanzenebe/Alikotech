import { useState } from "react";
import { useContracts, useCreateContract, useUpdateContract, useDeleteContract } from "@/hooks/use-contracts";
import { useAuth } from "@/contexts/AuthContext";
import { hasPermission } from "@/lib/rbac";
import StatusBadge from "@/components/shared/StatusBadge";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
import ContractFormDialog from "./ContractFormDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api-client";
import { useQueryClient } from "@tanstack/react-query";
import { ContractStatus, type Contract } from "@/types";
import { Calendar, DollarSign, Check, X, Plus, Trash2, Pencil } from "lucide-react";
import type { ContractFormData } from "@/lib/validations";

const ContractsPage = () => {
  const { data: contracts, isLoading, isError, refetch } = useContracts();
  const { user } = useAuth();
  const qc = useQueryClient();
  const createContract = useCreateContract();
  const updateContract = useUpdateContract();
  const deleteContract = useDeleteContract();

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Contract | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const canCreate = hasPermission(user?.role ?? null, "contract:create");
  const canApprove = hasPermission(user?.role ?? null, "contract:approve");

  const handleSubmit = (data: ContractFormData) => {
    if (editItem) {
      updateContract.mutate({ id: editItem.id, data }, {
        onSuccess: () => { setShowForm(false); setEditItem(null); toast({ title: "Contract updated" }); },
        onError: () => toast({ title: "Failed to update", variant: "destructive" }),
      });
    } else {
      createContract.mutate(data, {
        onSuccess: () => { setShowForm(false); toast({ title: "Contract created" }); },
        onError: () => toast({ title: "Failed to create", variant: "destructive" }),
      });
    }
  };

  const handleAction = async (contractId: string, action: "approve" | "reject") => {
    try {
      await api.patch(`/contracts/${contractId}`, {
        status: action === "approve" ? ContractStatus.APPROVED : ContractStatus.REJECTED,
      });
      qc.invalidateQueries({ queryKey: ["contracts"] });
      toast({ title: `Contract ${action}d` });
    } catch {
      toast({ title: `Failed to ${action}`, variant: "destructive" });
    }
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteContract.mutate(deleteId, {
      onSuccess: () => { setDeleteId(null); toast({ title: "Contract deleted" }); },
      onError: () => toast({ title: "Failed to delete", variant: "destructive" }),
    });
  };

  if (isLoading) return <PageSkeleton rows={4} />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Contracts</h2>
          <p className="text-sm text-muted-foreground">{contracts?.length ?? 0} contract{(contracts?.length ?? 0) !== 1 && "s"}</p>
        </div>
        {canCreate && (
          <Button onClick={() => { setEditItem(null); setShowForm(true); }} className="gap-2">
            <Plus size={16} /> New Contract
          </Button>
        )}
      </div>

      {!contracts?.length ? (
        <EmptyState title="No contracts" description="No contracts available." />
      ) : (
        <div className="space-y-3">
          {contracts.map((contract) => (
            <Card key={contract.id} className="group relative transition-all hover:border-accent/50">
              <CardHeader className="flex-row items-center justify-between gap-4 pb-2">
                <CardTitle className="text-sm font-medium">{contract.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <StatusBadge status={contract.status} />
                  {canCreate && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-accent hover:bg-accent/10" onClick={() => { setEditItem(contract); setShowForm(true); }}>
                      <Pencil size={13} />
                    </Button>
                  )}
                  {canCreate && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(contract.id)}>
                      <Trash2 size={13} />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  {contract.value != null && (
                    <span className="flex items-center gap-1"><DollarSign size={11} />{contract.value.toLocaleString()}</span>
                  )}
                  {contract.startDate && (
                    <span className="flex items-center gap-1"><Calendar size={11} />{new Date(contract.startDate).toLocaleDateString()}</span>
                  )}
                </div>
                {canApprove && contract.status === ContractStatus.PENDING_APPROVAL && (
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => handleAction(contract.id, "approve")}>
                      <Check size={14} /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5 text-destructive" onClick={() => handleAction(contract.id, "reject")}>
                      <X size={14} /> Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ContractFormDialog open={showForm} onOpenChange={(o) => { setShowForm(o); if (!o) setEditItem(null); }} onSubmit={handleSubmit} loading={createContract.isPending || updateContract.isPending} initial={editItem} />
      <ConfirmDelete open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} onConfirm={handleDelete} title="Delete contract" loading={deleteContract.isPending} />
    </div>
  );
};

export default ContractsPage;
