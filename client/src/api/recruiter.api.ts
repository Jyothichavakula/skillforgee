import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface RecruiterCompany {
  _id: string;
  name: string;
  logo?: string;
  industry?: string;
  location?: string;
}

export interface RecruiterJob {
  _id: string;
  title: string;
  status: "OPEN" | "CLOSED";
  location?: string;
  jobType?: string;
  applicationDeadline?: string;
  company?: RecruiterCompany;
  applicants: number;
  createdAt: string;
}

export interface RecruiterApplicant {
  _id: string;
  status:
    | "APPLIED"
    | "SHORTLISTED"
    | "INTERVIEW"
    | "SELECTED"
    | "REJECTED";

  appliedAt: string;

  studentId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    university?: string;
    degree?: string;
    graduationYear?: number;
    skills?: string[];
  };

  jobId?: {
    _id: string;
    title: string;
    location?: string;
    jobType?: string;
  };
}

export interface RecruiterOverview {
  totalJobs: number;
  activeJobs: number;
  closedJobs: number;
  totalApplicants: number;
  applied: number;
  shortlisted: number;
  interviews: number;
  selected: number;
  rejected: number;
}

export interface RecruiterDashboardData {
  overview: RecruiterOverview;
  recentApplicants: RecruiterApplicant[];
  jobs: RecruiterJob[];
}

export const getRecruiterDashboard =
  async (): Promise<RecruiterDashboardData> => {
    const response = await api.get<
      ApiResponse<{
        dashboard: RecruiterDashboardData;
      }>
    >("/recruiter/dashboard");

    return response.data.data.dashboard;
  };