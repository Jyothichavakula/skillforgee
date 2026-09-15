import { useQuery } from "@tanstack/react-query";

import {
  getDashboardAnalytics,
} from "../api/analytics.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAnalytics,
    staleTime: 60 * 1000,
  });
};