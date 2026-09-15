import { Response } from "express";

import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  careerCoachSchema,
} from "../validators/careerCoach.validator.js";

import {
  askCareerCoach,
} from "../services/careerCoach.service.js";

export const askCareerCoachController = async (
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

  const validatedData =
    careerCoachSchema.parse(req.body);

  const result = await askCareerCoach({
    userId: req.userId,
    message: validatedData.message,
    targetCompany:
      validatedData.targetCompany,
  });

  res.status(200).json({
    success: true,
    message:
      "Career coach response generated successfully",
    data: result,
  });
};