import api from "./axios";
import type { ApiResponse } from "../types/api";

import type {
  ProblemProgressStatus,
} from "./problem.api";

export interface ProblemProgress {
  _id: string;
  userId: string;
  problemId: string;
  status: ProblemProgressStatus;
  attempts: number;
  solvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getProblemProgress = async (
  problemId: string
): Promise<ProblemProgress | null> => {
  const response =
    await api.get<
      ApiResponse<{
        progress: ProblemProgress | null;
      }>
    >(`/problem-progress/${problemId}`);

  return response.data.data.progress;
};

export const updateProblemProgress =
  async (
    problemId: string,
    status: ProblemProgressStatus
  ): Promise<ProblemProgress> => {
    const response =
      await api.patch<
        ApiResponse<{
          progress: ProblemProgress;
        }>
      >(`/problem-progress/${problemId}`, {
        status,
      });

    return response.data.data.progress;
  };