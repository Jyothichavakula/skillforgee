import api from "./axios";
import type { ApiResponse } from "../types/api";

export type ProblemDifficulty =
  | "EASY"
  | "MEDIUM"
  | "HARD";

export type ProblemProgressStatus =
  | "NOT_STARTED"
  | "ATTEMPTED"
  | "SOLVED";

export interface Problem {
  _id: string;
  title: string;
  difficulty: ProblemDifficulty;
  topics: string[];
  companyTags: string[];
  leetcodeUrl?: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProblemListResponse {
  problems: Problem[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

export interface GetProblemsParams {
  search?: string;
  difficulty?: ProblemDifficulty;
  topic?: string;
  company?: string;
  page?: number;
  limit?: number;
}

export const getProblems = async (
  params?: GetProblemsParams
): Promise<ProblemListResponse> => {
  const response =
    await api.get<
      ApiResponse<ProblemListResponse>
    >("/problems", {
      params,
    });

  return response.data.data;
};

export const getProblemById = async (
  problemId: string
): Promise<Problem> => {
  const response =
    await api.get<
      ApiResponse<{ problem: Problem }>
    >(`/problems/${problemId}`);

  return response.data.data.problem;
};