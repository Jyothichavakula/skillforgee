import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface Company {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  companySize?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getCompanies = async (): Promise<Company[]> => {
  const response = await api.get<
    ApiResponse<{ companies: Company[] }>
  >("/companies");

  return response.data.data.companies;
};