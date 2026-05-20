import { ApiResponse } from "../types/api.types";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";
import { api } from "./axios";

export const loginApi = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    payload
  );

  return response.data.data;
};

export const registerApi = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    payload
  );

  return response.data.data;
};
