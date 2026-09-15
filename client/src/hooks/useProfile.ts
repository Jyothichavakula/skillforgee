import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getProfile,
  updateProfile,
  type UpdateProfileData,
} from "../api/user.api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) =>
      updateProfile(data),

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        ["profile"],
        updatedUser
      );
    },
  });
};