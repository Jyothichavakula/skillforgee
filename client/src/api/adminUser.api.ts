import api from "./axios";
import type { ApiResponse } from "../types/api";

export type AdminUserRole =
  | "STUDENT"
  | "RECRUITER"
  | "ADMIN";

export type AdminUserStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AdminUserRole;
  university?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;
  skills?: string[];
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface GetAdminUsersParams {
  search?: string;
  role?: AdminUserRole;
  status?: AdminUserStatus;
}

export const getAdminUsers = async (
  params?: GetAdminUsersParams
): Promise<AdminUser[]> => {
  const response =
    await api.get<
      ApiResponse<{
        users: AdminUser[];
      }>
    >("/admin/users", {
      params,
    });

  return response.data.data.users;
};

export const getAdminUserById = async (
  userId: string
): Promise<AdminUser> => {
  const response =
    await api.get<
      ApiResponse<{
        user: AdminUser;
      }>
    >(`/admin/users/${userId}`);

  return response.data.data.user;
};

export const updateAdminUserStatus =
  async (
    userId: string,
    isActive: boolean
  ): Promise<AdminUser> => {
    const response =
      await api.patch<
        ApiResponse<{
          user: AdminUser;
        }>
      >(
        `/admin/users/${userId}/status`,
        { isActive }
      );

    return response.data.data.user;
  };