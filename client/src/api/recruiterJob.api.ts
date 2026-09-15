import api from "./axios";
import type { ApiResponse } from "../types/api";

export type JobStatus = "OPEN" | "CLOSED";

export type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "INTERNSHIP";

export interface RecruiterJobCompany {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
}

export interface RecruiterJob {
  _id: string;
  title: string;
  companyId:
    | string
    | RecruiterJobCompany;
  description: string;
  requirements?: string[];
  skills?: string[];
  location: string;
  jobType: JobType;
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadline: string;
  status: JobStatus;
  createdBy?: string | {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface CreateJobData {
  title: string;
  companyId: string;
  description: string;
  requirements?: string[];
  skills?: string[];
  location: string;
  jobType: JobType;
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadline: string;
}

export interface UpdateJobData {
  title?: string;
  description?: string;
  requirements?: string[];
  skills?: string[];
  location?: string;
  jobType?: JobType;
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadline?: string;
  status?: JobStatus;
}

export const getMyJobs = async (): Promise<RecruiterJob[]> => {
  const response =
    await api.get<ApiResponse<{ jobs: RecruiterJob[] }>>(
      "/jobs/my"
    );

  return response.data.data.jobs;
};

export const getJobById = async (
  jobId: string
): Promise<RecruiterJob> => {
  const response = await api.get<
    ApiResponse<{ job: RecruiterJob }>
  >(`/jobs/${jobId}`);

  return response.data.data.job;
};

export const createJob = async (
  data: CreateJobData
): Promise<RecruiterJob> => {
  const response = await api.post<
    ApiResponse<{ job: RecruiterJob }>
  >("/jobs", data);

  return response.data.data.job;
};

export const updateJob = async (
  jobId: string,
  data: UpdateJobData
): Promise<RecruiterJob> => {
  const response = await api.patch<
    ApiResponse<{ job: RecruiterJob }>
  >(`/jobs/${jobId}`, data);

  return response.data.data.job;
};

export const deleteJob = async (
  jobId: string
): Promise<void> => {
  await api.delete(`/jobs/${jobId}`);
};