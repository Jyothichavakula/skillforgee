import { Response } from "express";

import {
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

import {
  getRecruiterDashboard,
} from "../services/recruiter.service.js";

export const getRecruiterDashboardController =
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

    const dashboard =
      await getRecruiterDashboard(
        req.userId
      );

    res.status(200).json({
      success: true,

      message:
        "Recruiter dashboard retrieved successfully",

      data: {
        dashboard,
      },
    });
  };