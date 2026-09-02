import { z } from "zod";
import { ProjectStatus, TaskStatus, ContractStatus, InspectionStatus } from "@/types";

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().min(1, "Description is required").max(2000),
  status: z.nativeEnum(ProjectStatus),
  progress: z.number().min(0).max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  isVisibleToClient: z.boolean(),
});
export type ProjectFormData = z.infer<typeof projectSchema>;

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(2000).optional(),
  status: z.nativeEnum(TaskStatus),
  projectId: z.string().min(1, "Project is required"),
  assigneeId: z.string().optional(),
  dueDate: z.string().optional(),
  progress: z.number().min(0).max(100),
});
export type TaskFormData = z.infer<typeof taskSchema>;

export const contractSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  projectId: z.string().min(1, "Project is required"),
  status: z.nativeEnum(ContractStatus),
  value: z.number().min(0).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type ContractFormData = z.infer<typeof contractSchema>;

export const inspectionSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  projectId: z.string().min(1, "Project is required"),
  status: z.nativeEnum(InspectionStatus),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
});
export type InspectionFormData = z.infer<typeof inspectionSchema>;
