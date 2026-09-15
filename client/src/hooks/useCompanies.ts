import { useQuery } from "@tanstack/react-query";

import { getCompanies } from "../api/company.api";

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
};