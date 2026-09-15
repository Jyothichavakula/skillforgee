import { Response } from "express";

import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import { getStudentRoadmap } from "../services/roadmap.service.js";

export const getRoadmap = async (
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

  const roadmap = await getStudentRoadmap(
    req.userId
  );

  res.status(200).json({
    success: true,
    message: "Learning roadmap retrieved successfully",
    data: {
      roadmap,
    },
  });
};