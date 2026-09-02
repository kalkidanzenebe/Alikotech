import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Task, ApiResponse } from "@/types";
import type { TaskFormData } from "@/lib/validations";

export function useTasks(projectId?: string) {
  const endpoint = projectId ? `/projects/${projectId}/tasks` : "/tasks";
  return useQuery<Task[]>({
    queryKey: ["tasks", projectId ?? "all"],
    queryFn: () => api.get<Task[]>(endpoint),
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TaskFormData) => api.post<ApiResponse<Task>>("/tasks", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TaskFormData> }) =>
      api.patch<ApiResponse<Task>>(`/tasks/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/tasks/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}
