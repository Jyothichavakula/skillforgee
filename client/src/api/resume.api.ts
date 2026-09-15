import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface ResumeAnalysis {
  _id: string;
  fileName?: string;
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];
  createdAt: string;
}

export const analyzeResume = async (
  file: File
): Promise<ResumeAnalysis> => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await api.post<ApiResponse<{ analysis: ResumeAnalysis }>>(
    "/resume/analyze",
    formData,
    {
      headers: {
        "Content-Type": undefined,
      },
    }
  );

  return response.data.data.analysis;
};

export const getMyResumeAnalyses = async (): Promise<ResumeAnalysis[]> => {
  const response = await api.get<
    ApiResponse<{ analyses: ResumeAnalysis[] }>
  >("/resume/me");

  return response.data.data.analyses;
};

export const getResumeAnalysisById = async (
  id: string
): Promise<ResumeAnalysis> => {
  const response = await api.get<ApiResponse<{ analysis: ResumeAnalysis }>>(
    `/resume/${id}`
  );

  return response.data.data.analysis;
};