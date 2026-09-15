import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface DiscussionAuthor {
  _id: string;
  name?: string;
  email?: string;
  profileImage?: string;
}

export interface DiscussionComment {
  _id: string;
  content: string;
  authorId:
    | string
    | DiscussionAuthor;
  createdAt: string;
}

export interface Discussion {
  _id: string;
  title: string;
  content: string;
  category: string;
  authorId:
    | string
    | DiscussionAuthor;
  likes: string[];
  comments?: DiscussionComment[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateDiscussionData {
  title: string;
  content: string;
  category: string;
}

export interface UpdateDiscussionData {
  title?: string;
  content?: string;
  category?: string;
}

export interface CreateCommentData {
  content: string;
}

export interface ToggleLikeResponse {
  liked: boolean;
  likesCount?: number;
}

export const getDiscussions = async (
  category?: string
): Promise<Discussion[]> => {
  const response = await api.get<
    ApiResponse<{ discussions: Discussion[] }>
  >("/discussions", {
    params: category ? { category } : undefined,
  });

  return response.data.data.discussions;
};

export const getDiscussionById = async (
  id: string
): Promise<Discussion> => {
  const response = await api.get<
    ApiResponse<Discussion>
  >(`/discussions/${id}`);

  return response.data.data;
};

export const createDiscussion = async (
  data: CreateDiscussionData
): Promise<Discussion> => {
  const response = await api.post<
    ApiResponse<{ discussion: Discussion }>
  >("/discussions", data);

  return response.data.data.discussion;
};

export const updateDiscussion = async (
  id: string,
  data: UpdateDiscussionData
): Promise<Discussion> => {
  const response = await api.patch<
    ApiResponse<{ discussion: Discussion }>
  >(`/discussions/${id}`, data);

  return response.data.data.discussion;
};

export const deleteDiscussion = async (
  id: string
): Promise<void> => {
  await api.delete(`/discussions/${id}`);
};

export const addComment = async (
  id: string,
  data: CreateCommentData
): Promise<DiscussionComment> => {
  const response = await api.post<
    ApiResponse<{ comment: DiscussionComment }>
  >(`/discussions/${id}/comments`, data);

  return response.data.data.comment;
};

export const deleteComment = async (
  commentId: string
): Promise<void> => {
  await api.delete(`/discussions/comments/${commentId}`);
};

export const toggleDiscussionLike = async (
  id: string
): Promise<ToggleLikeResponse> => {
  const response = await api.post<
    ApiResponse<ToggleLikeResponse>
  >(`/discussions/${id}/like`);

  return response.data.data;
};