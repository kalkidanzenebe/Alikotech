import {
  UserRole,
  ProjectStatus,
  TaskStatus,
  ContractStatus,
  InspectionStatus,
  MilestoneStatus,
} from "./enums";

// ─── User / Auth ────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole | null;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

// ─── Project ────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number; // 0–100
  startDate: string;
  endDate?: string;
  isVisibleToClient: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Task ───────────────────────────────────────────────────

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assigneeId?: string;
  dueDate?: string;
  progress: number;
  createdAt: string;
}

// ─── Contract ───────────────────────────────────────────────

export interface Contract {
  id: string;
  projectId: string;
  title: string;
  status: ContractStatus;
  value?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

// ─── Inspection ─────────────────────────────────────────────

export interface Inspection {
  id: string;
  projectId: string;
  title: string;
  status: InspectionStatus;
  scheduledDate: string;
  checklist?: InspectionChecklistItem[];
  createdAt: string;
}

export interface InspectionChecklistItem {
  id: string;
  label: string;
  passed: boolean | null;
  notes?: string;
}

// ─── Milestone ──────────────────────────────────────────────

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  status: MilestoneStatus;
  dueDate?: string;
}

// ─── Generic API Response ───────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
