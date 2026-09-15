import { useMutation, useQuery } from "@tanstack/react-query";
import {
  analyzeResume,
  getMyResumeAnalyses,
  getResumeAnalysisById,
} from "../api/resume.api";

export const useAnalyzeResume = () => {
  return useMutation({
    mutationFn: analyzeResume,
  });
};

export const useResumeAnalyses = () => {
  return useQuery({
    queryKey: ["resume-analyses"],
    queryFn: getMyResumeAnalyses,
  });
};

export const useResumeAnalysis = (id: string) => {
  return useQuery({
    queryKey: ["resume-analysis", id],
    queryFn: () => getResumeAnalysisById(id),
    enabled: Boolean(id),
  });
};