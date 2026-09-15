import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface CareerCoachRequest {
  message: string;
  targetCompany?: string;
}

export interface CareerCoachResponse {
  // Backend returns: { question, answer, studentContext }
  reply: string;
}

// Backend returns: { success, data: { question, answer, studentContext } }
export const askCareerCoach = async (
  data: CareerCoachRequest
): Promise<CareerCoachResponse> => {
  const response =
    await api.post<
      ApiResponse<{ question: string; answer: string; studentContext: unknown }>
    >("/career-coach/ask", data);

  const raw = response.data.data;

  return {
    // Backend field is "answer", expose it as "reply" to match existing UI
    reply: raw?.answer ?? "",
  };
};