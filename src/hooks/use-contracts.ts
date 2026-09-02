import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Contract, ApiResponse } from "@/types";
import type { ContractFormData } from "@/lib/validations";

export function useContracts(projectId?: string) {
  const endpoint = projectId ? `/projects/${projectId}/contracts` : "/contracts";
  return useQuery<Contract[]>({
    queryKey: ["contracts", projectId ?? "all"],
    queryFn: () => api.get<Contract[]>(endpoint),
  });
}

export function useCreateContract() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ContractFormData) => api.post<ApiResponse<Contract>>("/contracts", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contracts"] }),
  });
}

export function useUpdateContract() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContractFormData> }) =>
      api.patch<ApiResponse<Contract>>(`/contracts/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contracts"] }),
  });
}

export function useDeleteContract() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/contracts/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contracts"] }),
  });
}
