import { useQuery } from "@tanstack/react-query";

import {
  getProblems,
  getProblemById,
} from "../api/problem.api";

import type {
  GetProblemsParams,
} from "../api/problem.api";

export const useProblems = (
  params?: GetProblemsParams
) => {
  return useQuery({
    queryKey: ["problems", params],
    queryFn: () => getProblems(params),
    staleTime: 60 * 1000,
  });
};

export const useProblem = (
  problemId: string
) => {
  return useQuery({
    queryKey: ["problems", problemId],
    queryFn: () =>
      getProblemById(problemId),
    enabled: Boolean(problemId),
    staleTime: 60 * 1000,
  });
};