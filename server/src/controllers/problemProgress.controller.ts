import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  updateProblemProgress as updateProblemProgressService,
  getMyProblemProgress as getMyProblemProgressService,
  getProblemProgress as getProblemProgressService,
  getMyProblemStats as getMyProblemStatsService,
  getMyTopicStats as getMyTopicStatsService,
  getMyCompanyStats as getMyCompanyStatsService,
} from "../services/problemProgress.service.js";
import {
  updateProblemProgressSchema,
} from "../validators/problemProgress.validator.js";

export const updateProblemProgress = async (
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

  const { problemId } = req.params;

  if (typeof problemId !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid problem ID",
    });
    return;
  }

  const validatedData =
    updateProblemProgressSchema.parse(req.body);

  const progress =
    await updateProblemProgressService(
      req.userId,
      problemId,
      validatedData.status
    );

  res.status(200).json({
    success: true,
    message: "Problem progress updated successfully",
    data: {
      progress,
    },
  });
};

export const getMyProblemProgress = async (
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

  const progress =
    await getMyProblemProgressService(req.userId);

  res.status(200).json({
    success: true,
    message: "Problem progress retrieved successfully",
    data: {
      progress,
    },
  });
};

export const getProblemProgress = async (
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

  const { problemId } = req.params;

  if (typeof problemId !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid problem ID",
    });
    return;
  }

  const progress =
    await getProblemProgressService(
      req.userId,
      problemId
    );

  res.status(200).json({
    success: true,
    message: "Problem progress retrieved successfully",
    data: {
      progress,
    },
  });
};
export const getMyProblemStats = async (
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

  const stats =
    await getMyProblemStatsService(req.userId);

  res.status(200).json({
    success: true,
    message: "Problem statistics retrieved successfully",
    data: {
      stats,
    },
  });
};
export const getMyTopicStats = async (
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

  const topicStats =
    await getMyTopicStatsService(req.userId);

  res.status(200).json({
    success: true,
    message: "Topic statistics retrieved successfully",
    data: {
      topicStats,
    },
  });
};
export const getMyCompanyStats = async (
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

  const companyStats =
    await getMyCompanyStatsService(req.userId);

  res.status(200).json({
    success: true,
    message: "Company statistics retrieved successfully",
    data: {
      companyStats,
    },
  });
};