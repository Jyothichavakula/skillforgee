import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProblemProgress,
  updateProblemProgress,
} from "../api/problemProgress.api";

import type {
  ProblemProgressStatus,
} from "../api/problem.api";

export const useProblemProgress = (
  problemId: string
) => {
  return useQuery({
    queryKey: [
      "problem-progress",
      problemId,
    ],

    queryFn: () =>
      getProblemProgress(problemId),

    enabled: Boolean(problemId),

    staleTime: 30 * 1000,
  });
};

export const useUpdateProblemProgress =
  (problemId: string) => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: (
        status: ProblemProgressStatus
      ) =>
        updateProblemProgress(
          problemId,
          status
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "problem-progress",
            problemId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["problems"],
        });

        queryClient.invalidateQueries({
          queryKey: ["dashboard"],
        });

        queryClient.invalidateQueries({
          queryKey: ["gamification"],
        });
      },
    });
  };