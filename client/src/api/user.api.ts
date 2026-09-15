import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "STUDENT" | "RECRUITER" | "ADMIN";

  phone?: string;
  college?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;

  skills?: string[];

  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  college?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;
  skills?: string[];
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get<
    ApiResponse<{ user: UserProfile }>
  >("/users/me");

  return response.data.data.user;
};

export const updateProfile = async (
  data: UpdateProfileData
): Promise<UserProfile> => {
  const response = await api.patch<
    ApiResponse<{ user: UserProfile }>
  >("/users/me", data);

  return response.data.data.user;
};