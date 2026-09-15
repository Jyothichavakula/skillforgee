import { useQuery } from "@tanstack/react-query";

import { getRecruiterDashboard } from "../api/recruiter.api";

export const useRecruiterDashboard = () => {
  return useQuery({
    queryKey: ["recruiter-dashboard"],
    queryFn: getRecruiterDashboard,
  });
};