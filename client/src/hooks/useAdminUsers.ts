import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdminUsers,
  getAdminUserById,
  updateAdminUserStatus,
} from "../api/adminUser.api";

import type {
  GetAdminUsersParams,
} from "../api/adminUser.api";


export const useAdminUsers = (
  params?: GetAdminUsersParams
) => {
  return useQuery({
    queryKey: [
      "admin-users",
      params,
    ],
    queryFn: () =>
      getAdminUsers(params),
  });
};


export const useAdminUser = (
  userId: string
) => {
  return useQuery({
    queryKey: [
      "admin-user",
      userId,
    ],
    queryFn: () =>
      getAdminUserById(userId),
    enabled: Boolean(userId),
  });
};


export const useUpdateAdminUserStatus =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        userId,
        isActive,
      }: {
        userId: string;
        isActive: boolean;
      }) =>
        updateAdminUserStatus(
          userId,
          isActive
        ),

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "admin-users",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "admin-dashboard",
          ],
        });
      },
    });
  };