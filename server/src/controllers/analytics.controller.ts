import { Response } from "express";

import {
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

import {
  getStudentDashboardAnalytics,
} from "../services/analytics.service.js";

export const getStudentDashboardAnalyticsController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "User authentication required",
      });

      return;
    }

    const analytics =
      await getStudentDashboardAnalytics(
        req.userId
      );

    res.status(200).json({
      success: true,
      message:
        "Dashboard analytics retrieved successfully",
      data: {
        analytics,
      },
    });
  };