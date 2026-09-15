import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "STUDENT" | "RECRUITER" | "ADMIN";
  university?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminCompany {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
}

export interface AdminJob {
  _id: string;
  title: string;
  location?: string;
  jobType?: string;
  status: "OPEN" | "CLOSED";
  companyId?: AdminCompany;
  createdBy?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

export interface AdminDashboardData {
  overview: {
    users: {
      total: number;
      students: number;
      recruiters: number;
      admins: number;
      active: number;
      inactive: number;
    };

    companies: {
      total: number;
    };

    jobs: {
      total: number;
      open: number;
      closed: number;
    };

    applications: {
      total: number;
      applied: number;
      shortlisted: number;
      interviews: number;
      selected: number;
      rejected: number;
    };

    problems: {
      total: number;
      active: number;
      inactive: number;
    };
  };

  recentUsers: AdminUser[];

  recentJobs: AdminJob[];
}


export const getAdminDashboard =
  async (): Promise<AdminDashboardData> => {
    const response =
      await api.get<
        ApiResponse<{
          dashboard: AdminDashboardData;
        }>
      >("/admin/dashboard");

    return response.data.data.dashboard;
  };