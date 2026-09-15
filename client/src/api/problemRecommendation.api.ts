import api from "./axios";
import type { ApiResponse } from "../types/api";
import type { Problem } from "./problem.api";

export interface RecommendedProblemsResponse {
  problems: Problem[];
}

export interface GetRecommendationsParams {
  company?: string;
  limit?: number;
}

export const getRecommendedProblems =
  async (
    params?: GetRecommendationsParams
  ): Promise<Problem[]> => {
    const response =
      await api.get<
        ApiResponse<RecommendedProblemsResponse>
      >("/problems/recommended", {
        params,
      });

    return response.data.data.problems;
  };