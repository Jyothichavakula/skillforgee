import api from "./axios";
import type { ApiResponse } from "../types/api";

export type ApplicationStatus =
  | "APPLIED"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "SELECTED"
  | "REJECTED";

export interface ApplicationJob {
  _id: string;
  title: string;
  location?: string;
  jobType?: string;
  companyId?:
    | string
    | {
        _id: string;
        name: string;
        logo?: string;
      };
}

export interface Application {
  _id: string;

  jobId:
    | string
    | ApplicationJob;

  studentId: string;

  status: ApplicationStatus;

  coverLetter?: string;

  resumeUrl?: string;

  appliedAt: string;

  createdAt?: string;

  updatedAt?: string;
}

export interface CreateApplicationData {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export const createApplication = async (
  data: CreateApplicationData
): Promise<Application> => {
  const response =
    await api.post<
      ApiResponse<{ application: Application }>
    >("/applications", data);

  return response.data.data.application;
};

export const getMyApplications =
  async (): Promise<Application[]> => {
    const response =
      await api.get<
        ApiResponse<{
          applications: Application[];
        }>
      >("/applications/me");

    return response.data.data.applications;
  };

export const getApplicationById = async (
  applicationId: string
): Promise<Application> => {
  const response =
    await api.get<
      ApiResponse<{ application: Application }>
    >(`/applications/${applicationId}`);

  return response.data.data.application;
};