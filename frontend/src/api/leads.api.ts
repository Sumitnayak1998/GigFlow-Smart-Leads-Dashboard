import { ApiResponse } from "../types/api.types";
import {
  CreateLeadPayload,
  Lead,
  LeadFilters,
  LeadListResponse,
  UpdateLeadPayload,
} from "../types/lead.types";
import { api } from "./axios";

const buildQueryString = (filters: LeadFilters): string => {
  const params = new URLSearchParams();

  if (filters.status) params.set("status", filters.status);
  if (filters.source) params.set("source", filters.source);
  if (filters.search) params.set("search", filters.search);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));

  return params.toString();
};

export const getLeadsApi = async (
  filters: LeadFilters
): Promise<LeadListResponse> => {
  const response = await api.get<ApiResponse<LeadListResponse>>(
    `/leads?${buildQueryString(filters)}`
  );

  return response.data.data;
};

export const getLeadByIdApi = async (id: string): Promise<Lead> => {
  const response = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
  return response.data.data;
};

export const createLeadApi = async (
  payload: CreateLeadPayload
): Promise<Lead> => {
  const response = await api.post<ApiResponse<Lead>>("/leads", payload);
  return response.data.data;
};

export const updateLeadApi = async (
  id: string,
  payload: UpdateLeadPayload
): Promise<Lead> => {
  const response = await api.patch<ApiResponse<Lead>>(`/leads/${id}`, payload);
  return response.data.data;
};

export const deleteLeadApi = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const exportLeadsCsvApi = async (
  filters: LeadFilters
): Promise<Blob> => {
  const response = await api.get(`/leads/export/csv?${buildQueryString(filters)}`, {
    responseType: "blob",
  });

  return response.data;
};
