import mongoose from "mongoose";

import Notification from "../models/Notification.js";

type NotificationType =
  | "APPLICATION_STATUS"
  | "ROADMAP"
  | "CODING"
  | "RESUME"
  | "SYSTEM";

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  relatedId?: string;
}

export const createNotification = async (
  data: CreateNotificationInput
) => {
  const notification =
    await Notification.create({
      userId: new mongoose.Types.ObjectId(
        data.userId
      ),

      type: data.type,

      title: data.title,

      message: data.message,

      relatedId: data.relatedId
        ? new mongoose.Types.ObjectId(
            data.relatedId
          )
        : undefined,
    });

  return notification;
};

export const getMyNotifications =
  async (userId: string) => {
    return Notification.find({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .limit(50);
  };

export const markNotificationAsRead =
  async (
    notificationId: string,
    userId: string
  ) => {
    const notification =
      await Notification.findOneAndUpdate(
        {
          _id: notificationId,
          userId,
        },
        {
          $set: {
            isRead: true,
          },
        },
        {
          new: true,
        }
      );

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    return notification;
  };

export const markAllNotificationsAsRead =
  async (userId: string) => {
    const result =
      await Notification.updateMany(
        {
          userId,
          isRead: false,
        },
        {
          $set: {
            isRead: true,
          },
        }
      );

    return {
      modifiedCount: result.modifiedCount,
    };
  };

export const deleteNotification =
  async (
    notificationId: string,
    userId: string
  ) => {
    const notification =
      await Notification.findOneAndDelete({
        _id: notificationId,
        userId,
      });

    if (!notification) {
      throw new Error(
        "Notification not found"
      );
    }

    return notification;
  };