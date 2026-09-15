import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMyJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../api/recruiterJob.api";

import type {
  CreateJobData,
  UpdateJobData,
} from "../api/recruiterJob.api";


// Get all jobs created by the logged-in recruiter
export const useRecruiterJobs = () =>
  useQuery({
    queryKey: ["recruiter-jobs"],
    queryFn: getMyJobs,
  });


// Get a single recruiter job
export const useRecruiterJob = (jobId: string) => {
  return useQuery({
    queryKey: ["recruiter-job", jobId],
    queryFn: () => getJobById(jobId),
    enabled: Boolean(jobId),
  });
};


// Create a new job
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobData) =>
      createJob(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recruiter-dashboard"],
      });
    },
  });
};


// Update an existing job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      jobId,
      data,
    }: {
      jobId: string;
      data: UpdateJobData;
    }) => updateJob(jobId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "recruiter-job",
          variables.jobId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ["recruiter-dashboard"],
      });
    },
  });
};


// Delete a job
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) =>
      deleteJob(jobId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recruiter-jobs"],
      });

      queryClient.invalidateQueries({
        queryKey: ["recruiter-dashboard"],
      });
    },
  });
};