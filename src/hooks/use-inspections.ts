import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Inspection, ApiResponse } from "@/types";
import type { InspectionFormData } from "@/lib/validations";

export function useInspections(projectId?: string) {
  const endpoint = projectId ? `/projects/${projectId}/inspections` : "/inspections";
  return useQuery<Inspection[]>({
    queryKey: ["inspections", projectId ?? "all"],
    queryFn: () => api.get<Inspection[]>(endpoint),
  });
}

export function useCreateInspection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InspectionFormData) => api.post<ApiResponse<Inspection>>("/inspections", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inspections"] }),
  });
}

export function useUpdateInspection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InspectionFormData> }) =>
      api.patch<ApiResponse<Inspection>>(`/inspections/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inspections"] }),
  });
}

export function useDeleteInspection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/inspections/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["inspections"] }),
  });
}
