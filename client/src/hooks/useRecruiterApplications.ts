import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getApplicantsByJob,
  updateApplicationStatus,
} from "../api/recruiterApplication.api";

import type {
  RecruiterApplicationStatus,
} from "../api/recruiterApplication.api";


// Get applicants for a specific job
export const useRecruiterApplications = (
  jobId: string
) => {
  return useQuery({
    queryKey: [
      "recruiter-applications",
      jobId,
    ],
    queryFn: () =>
      getApplicantsByJob(jobId),
    enabled: Boolean(jobId),
  });
};


// Update applicant status
export const useUpdateApplicationStatus = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: RecruiterApplicationStatus;
    }) =>
      updateApplicationStatus(
        applicationId,
        status
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "recruiter-applications",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "recruiter-dashboard",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "applications",
        ],
      });
    },
  });
};