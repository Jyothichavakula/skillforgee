import { useQuery } from "@tanstack/react-query";

import {
  getRecommendedProblems,
} from "../api/problemRecommendation.api";

import type {
  GetRecommendationsParams,
} from "../api/problemRecommendation.api";

export const useRecommendedProblems = (
  params?: GetRecommendationsParams
) => {
  return useQuery({
    queryKey: [
      "recommended-problems",
      params,
    ],

    queryFn: () =>
      getRecommendedProblems(params),

    staleTime: 60 * 1000,
  });
};