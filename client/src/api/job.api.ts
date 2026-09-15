import api from "./axios";

import type { ApiResponse } from "../types/api";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP";

export type JobStatus =
  | "OPEN"
  | "CLOSED";

export interface CompanySummary {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
}

export interface Job {
  _id: string;

  title: string;

  companyId:
    | string
    | CompanySummary;

  description: string;

  requirements: string[];

  skills: string[];

  location: string;

  jobType: JobType;

  salaryMin?: number;

  salaryMax?: number;

  applicationDeadline?: string;

  status: JobStatus;

  createdBy?: string | {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  };

  createdAt: string;

  updatedAt: string;
}

export interface JobListResponse {
  jobs: Job[];

  total?: number;

  page?: number;

  limit?: number;

  totalPages?: number;
}

export interface GetJobsParams {
  search?: string;
  location?: string;
  jobType?: JobType;
  status?: JobStatus;
  page?: number;
  limit?: number;
}

export const getJobs = async (
  params?: GetJobsParams
): Promise<JobListResponse> => {
  const response =
    await api.get<
      ApiResponse<JobListResponse>
    >("/jobs", {
      params,
    });

  return response.data.data;
};

export const getJobById = async (
  jobId: string
): Promise<Job> => {
  const response =
    await api.get<
      ApiResponse<{ job: Job }>
    >(`/jobs/${jobId}`);

  return response.data.data.job;
};