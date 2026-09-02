import { Badge } from "@/components/ui/badge";
import {
  ProjectStatus,
  TaskStatus,
  ContractStatus,
  InspectionStatus,
  MilestoneStatus,
} from "@/types";

type AnyStatus =
  | ProjectStatus
  | TaskStatus
  | ContractStatus
  | InspectionStatus
  | MilestoneStatus;

const STATUS_STYLES: Record<string, string> = {
  // greens
  COMPLETED: "bg-emerald-500/12 text-emerald-700 border-emerald-500/30",
  APPROVED: "bg-emerald-500/12 text-emerald-700 border-emerald-500/30",
  ACTIVE: "bg-emerald-500/12 text-emerald-700 border-emerald-500/30",

  // blues
  IN_PROGRESS: "bg-blue-500/12 text-blue-700 border-blue-500/30",
  IN_REVIEW: "bg-blue-500/12 text-blue-700 border-blue-500/30",
  REVIEW: "bg-blue-500/12 text-blue-700 border-blue-500/30",
  SCHEDULED: "bg-blue-500/12 text-blue-700 border-blue-500/30",

  // yellows / oranges
  PENDING: "bg-amber-500/12 text-amber-700 border-amber-500/30",
  PENDING_APPROVAL: "bg-amber-500/12 text-amber-700 border-amber-500/30",
  ON_HOLD: "bg-amber-500/12 text-amber-700 border-amber-500/30",
  TODO: "bg-amber-500/12 text-amber-700 border-amber-500/30",

  // reds
  BLOCKED: "bg-destructive/12 text-destructive border-destructive/30",
  FAILED: "bg-destructive/12 text-destructive border-destructive/30",
  REJECTED: "bg-destructive/12 text-destructive border-destructive/30",
  CANCELLED: "bg-destructive/12 text-destructive border-destructive/30",
  TERMINATED: "bg-destructive/12 text-destructive border-destructive/30",
  DELAYED: "bg-destructive/12 text-destructive border-destructive/30",

  // neutrals
  PLANNED: "bg-secondary text-secondary-foreground border-border",
  DRAFT: "bg-secondary text-secondary-foreground border-border",
  AMENDED: "bg-secondary text-secondary-foreground border-border",
};

interface StatusBadgeProps {
  status: AnyStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = STATUS_STYLES[status] || "bg-secondary text-secondary-foreground border-border";
  const label = status.replace(/_/g, " ");

  return (
    <Badge variant="outline" className={`rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${style}`}>
      {label}
    </Badge>
  );
};

export default StatusBadge;
