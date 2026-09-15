import api from "./axios";

import type { ApiResponse } from "../types/api";
import type { User } from "../types/user";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export const registerUser = async (
  data: RegisterInput
): Promise<AuthResponse> => {
  const response =
    await api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      data
    );

  return response.data.data;
};

export const loginUser = async (
  data: LoginInput
): Promise<AuthResponse> => {
  const response =
    await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      data
    );

  return response.data.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response =
    await api.get<
      ApiResponse<{ user: User }>
    >("/auth/me");

  return response.data.data.user;
};

export const refreshAccessToken = async (): Promise<string> => {
  const response =
    await api.post<
      ApiResponse<{ accessToken: string }>
    >("/auth/refresh");

  return response.data.data.accessToken;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};