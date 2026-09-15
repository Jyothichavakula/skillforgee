import api from "./axios";

import type { ApiResponse } from "../types/api";

export interface DashboardAnalytics {
  profile: {
    [key: string]: unknown;
  };

  coding: {
    [key: string]: unknown;
  };

  applications: {
    [key: string]: unknown;
  };

  companyPreparation?: {
    [key: string]: unknown;
  };

  resume?: {
    [key: string]: unknown;
  } | null;

  roadmap?: {
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

export const getDashboardAnalytics =
  async (): Promise<DashboardAnalytics> => {
    const response =
      await api.get<
        ApiResponse<DashboardAnalytics>
      >("/analytics/dashboard");

    return response.data.data;
  };