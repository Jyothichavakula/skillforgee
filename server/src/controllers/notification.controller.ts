import { Response } from "express";

import {
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../services/notification.service.js";

export const getMyNotificationsController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message:
          "User authentication required",
      });

      return;
    }

    const notifications =
      await getMyNotifications(
        req.userId
      );

    res.status(200).json({
      success: true,
      message:
        "Notifications retrieved successfully",
      data: {
        notifications,
      },
    });
  };

export const markNotificationAsReadController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message:
          "User authentication required",
      });

      return;
    }

    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message:
          "Invalid notification ID",
      });

      return;
    }

    const notification =
      await markNotificationAsRead(
        id,
        req.userId
      );

    res.status(200).json({
      success: true,
      message:
        "Notification marked as read",
      data: {
        notification,
      },
    });
  };

export const markAllNotificationsAsReadController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message:
          "User authentication required",
      });

      return;
    }

    const result =
      await markAllNotificationsAsRead(
        req.userId
      );

    res.status(200).json({
      success: true,
      message:
        "All notifications marked as read",
      data: result,
    });
  };

export const deleteNotificationController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message:
          "User authentication required",
      });

      return;
    }

    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message:
          "Invalid notification ID",
      });

      return;
    }

    await deleteNotification(
      id,
      req.userId
    );

    res.status(200).json({
      success: true,
      message:
        "Notification deleted successfully",
    });
  };