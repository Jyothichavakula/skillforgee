import { Response } from "express";

import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import { getRecommendedProblems } from "../services/problemRecommendation.service.js";

export const getRecommendedProblemsController = async (
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

  const { company, limit } = req.query;

  let parsedLimit = 5;

  if (typeof limit === "string") {
    const numericLimit = Number(limit);

    if (
      !Number.isInteger(numericLimit) ||
      numericLimit < 1 ||
      numericLimit > 20
    ) {
      res.status(400).json({
        success: false,
        message: "Limit must be a number between 1 and 20",
      });

      return;
    }

    parsedLimit = numericLimit;
  }

  const recommendations =
    await getRecommendedProblems(req.userId, {
      company:
        typeof company === "string"
          ? company
          : undefined,
      limit: parsedLimit,
    });

  res.status(200).json({
    success: true,
    message:
      "Recommended problems retrieved successfully",
    data: {
      recommendations,
    },
  });
};