import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  createApplication as createApplicationService,
  getMyApplications as getMyApplicationsService,
  getApplicationById as getApplicationByIdService,
  getJobApplicants as getJobApplicantsService,
  updateApplicationStatus as updateApplicationStatusService,
} from "../services/application.service.js";

import {
  createApplicationSchema,
  updateApplicationStatusSchema,
} from "../validators/application.validator.js";

export const createApplication = async (
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

  const validatedData = createApplicationSchema.parse(
    req.body
  );

  const application = await createApplicationService({
    ...validatedData,
    studentId: req.userId,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted successfully",
    data: {
      application,
    },
  });
};

export const getMyApplications = async (
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

  const applications =
    await getMyApplicationsService(req.userId);

  res.status(200).json({
    success: true,
    message: "Applications retrieved successfully",
    data: {
      applications,
    },
  });
};

export const getApplicationById = async (
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
      message: "Invalid application ID",
    });
    return;
  }

  const application =
    await getApplicationByIdService(
      id,
      req.userId
    );

  res.status(200).json({
    success: true,
    message: "Application retrieved successfully",
    data: {
      application,
    },
  });
};

export const getJobApplicants = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId || !req.userRole) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const { jobId } = req.params;

  if (typeof jobId !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid job ID",
    });
    return;
  }

  // Narrow the role type
  if (
    req.userRole !== "RECRUITER" &&
    req.userRole !== "ADMIN"
  ) {
    res.status(403).json({
      success: false,
      message: "You do not have permission to access applicants",
    });
    return;
  }

  const applications =
    await getJobApplicantsService(
      jobId,
      req.userId,
      req.userRole
    );

  res.status(200).json({
    success: true,
    message: "Job applicants retrieved successfully",
    data: {
      applications,
    },
  });
};

export const updateApplicationStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId || !req.userRole) {
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
      message: "Invalid application ID",
    });
    return;
  }

  // Narrow the role type
  if (
    req.userRole !== "RECRUITER" &&
    req.userRole !== "ADMIN"
  ) {
    res.status(403).json({
      success: false,
      message:
        "You do not have permission to update application status",
    });
    return;
  }

  const validatedData =
    updateApplicationStatusSchema.parse(req.body);

  const application =
    await updateApplicationStatusService(
      id,
      validatedData.status,
      req.userId,
      req.userRole
    );

  res.status(200).json({
    success: true,
    message: "Application status updated successfully",
    data: {
      application,
    },
  });
};