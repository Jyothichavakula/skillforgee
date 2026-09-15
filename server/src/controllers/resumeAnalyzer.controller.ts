import { Response } from "express";

import {
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

import {
  analyzeResume,
  getMyResumeAnalyses,
  getResumeAnalysisById,
} from "../services/resumeAnalyzer.service.js";

export const analyzeResumeController = async (
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

  if (!req.file) {
    res.status(400).json({
      success: false,
      message: "Resume file is required",
    });

    return;
  }

  const fileType =
    req.file.mimetype === "application/pdf"
      ? "PDF"
      : "DOCX";

  const analysis = await analyzeResume({
    userId: req.userId,
    fileName: req.file.originalname,
    fileType,
    buffer: req.file.buffer,
  });

  res.status(201).json({
    success: true,
    message: "Resume analyzed successfully",
    data: {
      analysis,
    },
  });
};

export const getMyResumeAnalysesController =
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

    const analyses = await getMyResumeAnalyses(
      req.userId
    );

    res.status(200).json({
      success: true,
      message:
        "Resume analyses retrieved successfully",
      data: {
        analyses,
      },
    });
  };

export const getResumeAnalysisByIdController =
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

    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid analysis ID",
      });

      return;
    }

    const analysis =
      await getResumeAnalysisById(
        req.userId,
        id
      );

    res.status(200).json({
      success: true,
      message:
        "Resume analysis retrieved successfully",
      data: {
        analysis,
      },
    });
  };