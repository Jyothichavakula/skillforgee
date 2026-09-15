import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createApplication,
  getMyApplications,
  getApplicationById,
} from "../api/application.api";

import type {
  CreateApplicationData,
} from "../api/application.api";

export const useApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getMyApplications,
    staleTime: 60 * 1000,
  });
};

export const useApplication = (
  applicationId: string
) => {
  return useQuery({
    queryKey: [
      "applications",
      applicationId,
    ],
    queryFn: () =>
      getApplicationById(applicationId),
    enabled: Boolean(applicationId),
  });
};

export const useCreateApplication = () => {
  return useMutation({
    mutationFn: (
      data: CreateApplicationData
    ) => createApplication(data),
  });
};