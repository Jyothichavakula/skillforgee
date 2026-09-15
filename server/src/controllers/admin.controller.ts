import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { getAdminDashboard } from "../services/admin.service.js";

export const getAdminDashboardController = async (
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

  const dashboard = await getAdminDashboard();

  res.status(200).json({
    success: true,
    message: "Admin dashboard retrieved successfully",
    data: {
      dashboard,
    },
  });
};