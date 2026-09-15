import { useQuery } from "@tanstack/react-query";

import {
  getJobs,
  getJobById,
} from "../api/job.api";

import type {
  GetJobsParams,
} from "../api/job.api";

export const useJobs = (
  params?: GetJobsParams
) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => getJobs(params),
    staleTime: 60 * 1000,
  });
};

export const useJob = (
  jobId: string
) => {
  return useQuery({
    queryKey: ["jobs", jobId],
    queryFn: () => getJobById(jobId),
    enabled: Boolean(jobId),
    staleTime: 60 * 1000,
  });
};