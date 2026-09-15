import { useQuery } from "@tanstack/react-query";

import {
  getMyGamification,
} from "../api/gamification.api";

export const useGamification =
  () => {
    return useQuery({
      queryKey: ["gamification"],
      queryFn: getMyGamification,
    });
  };