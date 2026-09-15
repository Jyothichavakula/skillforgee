import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  addComment,
  deleteComment,
  toggleDiscussionLike,
} from "../api/discussion.api";

import type {
  CreateDiscussionData,
  UpdateDiscussionData,
  CreateCommentData,
} from "../api/discussion.api";

export const useDiscussions = (
  category?: string
) => {
  return useQuery({
    queryKey: ["discussions", category],
    queryFn: () => getDiscussions(category),
  });
};

export const useDiscussion = (id: string) => {
  return useQuery({
    queryKey: ["discussion", id],
    queryFn: () => getDiscussionById(id),
    enabled: Boolean(id),
  });
};

export const useCreateDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDiscussionData) =>
      createDiscussion(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussions"],
      });
    },
  });
};

export const useUpdateDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDiscussionData;
    }) => updateDiscussion(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["discussions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["discussion", variables.id],
      });
    },
  });
};

export const useDeleteDiscussion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDiscussion,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussions"],
      });
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateCommentData;
    }) => addComment(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["discussion", variables.id],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussions"],
      });
    },
  });
};

export const useToggleDiscussionLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleDiscussionLike,

    onSuccess: (_, discussionId) => {
      queryClient.invalidateQueries({
        queryKey: ["discussions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["discussion", discussionId],
      });
    },
  });
};