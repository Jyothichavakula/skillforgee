import api from "./axios";
import type { ApiResponse } from "../types/api";

export type RecruiterApplicationStatus =
  | "APPLIED"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "SELECTED"
  | "REJECTED";

export interface ApplicantStudent {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  university?: string;
  college?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;
  skills?: string[];
  phone?: string;
}

export interface ApplicantJob {
  _id: string;
  title: string;
  location?: string;
  jobType?: string;
}

export interface RecruiterApplication {
  _id: string;

  studentId:
    | string
    | ApplicantStudent;

  jobId:
    | string
    | ApplicantJob;

  status: RecruiterApplicationStatus;

  coverLetter?: string;

  resumeUrl?: string;

  appliedAt: string;

  createdAt?: string;

  updatedAt?: string;
}


// Get applicants for a specific job
export const getApplicantsByJob = async (
  jobId: string
): Promise<RecruiterApplication[]> => {
  const response =
    await api.get<
      ApiResponse<{
        applications: RecruiterApplication[];
      }>
    >(`/applications/job/${jobId}`);

  return response.data.data.applications;
};


// Update application status
export const updateApplicationStatus = async (
  applicationId: string,
  status: RecruiterApplicationStatus
): Promise<RecruiterApplication> => {
  const response =
    await api.patch<
      ApiResponse<{
        application: RecruiterApplication;
      }>
    >(
      `/applications/${applicationId}/status`,
      { status }
    );

  return response.data.data.application;
};