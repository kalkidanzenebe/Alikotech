// ─── Centralized API Client (Axios) ─────────────────────────
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://con-tech.alikohub.com";

// ─── Axios instance ────────────────────────────────────────

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});

// ─── Token management ──────────────────────────────────────

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getAuthToken(): string | null {
  return authToken;
}

// ─── Request interceptor — inject token ────────────────────

axiosInstance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// ─── Response interceptor — error handling ─────────────────

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      setAuthToken(null);
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    const data = error.response?.data as Record<string, unknown> | undefined;
    const message =
      (data?.message as string) || error.message || "Request failed";

    return Promise.reject(new ApiError(message, status ?? 0, data));
  }
);

// ─── Error class ────────────────────────────────────────────

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ─── Convenience methods (same signatures as before) ───────

export const api = {
  get: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get<T>(endpoint, config).then((r) => r.data),

  post: <T>(endpoint: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post<T>(endpoint, body, config).then((r) => r.data),

  put: <T>(endpoint: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<T>(endpoint, body, config).then((r) => r.data),

  patch: <T>(endpoint: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.patch<T>(endpoint, body, config).then((r) => r.data),

  delete: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete<T>(endpoint, config).then((r) => r.data),
};

export default axiosInstance;
