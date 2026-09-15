import { Response } from "express";

import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  getAdminDashboard,
  getAdminUsers,
  getAdminUserById,
  updateAdminUserStatus,
} from "../services/admin.service.js";

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

// ========================================
// GET ADMIN USERS
// ========================================

export const getAdminUsersController = async (
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

  const search =
    typeof req.query.search === "string"
      ? req.query.search
      : undefined;

  const role =
    typeof req.query.role === "string"
      ? req.query.role
      : undefined;

  const status =
    typeof req.query.status === "string"
      ? req.query.status
      : undefined;

  const users =
    await getAdminUsers({
      search,
      role:
        role === "STUDENT" ||
        role === "RECRUITER" ||
        role === "ADMIN"
          ? role
          : undefined,

      status:
        status === "ACTIVE" ||
        status === "INACTIVE"
          ? status
          : undefined,
    });

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",

    data: {
      users,
    },
  });
};


// ========================================
// GET ADMIN USER BY ID
// ========================================

export const getAdminUserByIdController =
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
        message: "Invalid user ID",
      });

      return;
    }

    const user =
      await getAdminUserById(id);

    res.status(200).json({
      success: true,
      message:
        "User retrieved successfully",

      data: {
        user,
      },
    });
  };


// ========================================
// UPDATE USER STATUS
// ========================================

export const updateAdminUserStatusController =
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
        message: "Invalid user ID",
      });

      return;
    }

    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      res.status(400).json({
        success: false,
        message:
          "isActive must be a boolean",
      });

      return;
    }

    // Prevent admin from deactivating
    // their own account
    if (id === req.userId) {
      res.status(400).json({
        success: false,
        message:
          "You cannot change your own account status",
      });

      return;
    }

    const user =
      await updateAdminUserStatus(
        id,
        isActive
      );

    res.status(200).json({
      success: true,
      message:
        isActive
          ? "User activated successfully"
          : "User deactivated successfully",

      data: {
        user,
      },
    });
  };