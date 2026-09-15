import { useQuery } from "@tanstack/react-query";

import {
  getMyRoadmap,
} from "../api/roadmap.api";

export const useRoadmap = () => {
  return useQuery({
    queryKey: ["roadmap"],

    queryFn: getMyRoadmap,

    staleTime: 60 * 1000,
  });
};