import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import {
  getUserById,
  updateUserProfile,
} from "../services/user.service.js";
import { updateProfileSchema } from "../validators/user.validator.js";

export const getProfile = async (
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

  const user = await getUserById(req.userId);

  res.status(200).json({
    success: true,
    message: "Profile retrieved successfully",
    data: {
      user,
    },
  });
};

export const updateProfile = async (
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

  const validatedData = updateProfileSchema.parse(req.body);

  const user = await updateUserProfile(
    req.userId,
    validatedData
  );

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: {
      user,
    },
  });
};