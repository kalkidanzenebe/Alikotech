import { useState } from "react";
import { useUsers, useUpdateUserRole, useDeleteUser } from "@/hooks/use-users";
import { UserRole } from "@/types";
import PageSkeleton from "@/components/shared/PageSkeleton";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmDelete from "@/components/shared/ConfirmDelete";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Trash2, Mail, Shield } from "lucide-react";

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-accent/15 text-accent border-accent/30",
  CONTRACTOR: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  CLIENT: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};

const UsersPage = () => {
  const { data: users, isLoading, isError, refetch } = useUsers();
  const updateRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleRoleChange = (userId: string, role: UserRole) => {
    updateRole.mutate(
      { userId, role },
      {
        onSuccess: () => toast({ title: "Role updated" }),
        onError: () => toast({ title: "Failed to update role", variant: "destructive" }),
      }
    );
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteUser.mutate(deleteId, {
      onSuccess: () => { setDeleteId(null); toast({ title: "User removed" }); },
      onError: () => toast({ title: "Failed to remove user", variant: "destructive" }),
    });
  };

  if (isLoading) return <PageSkeleton rows={6} />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!users?.length) return <EmptyState title="No users" description="No users registered yet." />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">User Management</h2>
          <p className="text-sm text-muted-foreground">{users.length} user{users.length !== 1 && "s"}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield size={14} className="text-accent" /> Admin only
        </div>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <Card key={u.id} className="group transition-all hover:border-accent/50">
            <CardContent className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-sm">
                  {u.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{u.name || "Unnamed"}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                    <Mail size={10} /> {u.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {u.role ? (
                  <Select
                    value={u.role}
                    onValueChange={(v) => handleRoleChange(u.id, v as UserRole)}
                  >
                    <SelectTrigger className="w-36 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(UserRole).map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="outline" className="text-xs bg-secondary text-muted-foreground">No Role</Badge>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteId(u.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ConfirmDelete
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove user"
        description="This will permanently remove this user and revoke their access."
        loading={deleteUser.isPending}
      />
    </div>
  );
};

export default UsersPage;
