import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}

export const getMyNotifications = async (): Promise<Notification[]> => {
  const response = await api.get<
    ApiResponse<{ notifications: Notification[] }>
  >("/notifications");

  return response.data.data.notifications;
};

export const markNotificationAsRead = async (
  id: string
): Promise<Notification> => {
  const response = await api.patch<
    ApiResponse<{ notification: Notification }>
  >(`/notifications/${id}/read`);

  return response.data.data.notification;
};

export const markAllNotificationsAsRead = async () => {
  const response = await api.patch<
    ApiResponse<Record<string, unknown>>
  >("/notifications/read-all");

  return response.data.data;
};

export const deleteNotification = async (
  id: string
): Promise<void> => {
  await api.delete(`/notifications/${id}`);
};