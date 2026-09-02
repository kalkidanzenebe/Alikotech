// ─── Domain Enums ───────────────────────────────────────────

export enum UserRole {
  ADMIN = "ADMIN",
  CONTRACTOR = "CONTRACTOR",
  CLIENT = "CLIENT",
}

export enum ProjectStatus {
  PLANNED = "PLANNED",
  ACTIVE = "ACTIVE",
  ON_HOLD = "ON_HOLD",
  DELAYED = "DELAYED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum TaskStatus {
  TODO = "TODO",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED",
  BLOCKED = "BLOCKED",
}

export enum MilestoneStatus {
  PENDING = "PENDING",
  IN_REVIEW = "IN_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum ContractStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  AMENDED = "AMENDED",
  TERMINATED = "TERMINATED",
}

export enum InspectionStatus {
  SCHEDULED = "SCHEDULED",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
