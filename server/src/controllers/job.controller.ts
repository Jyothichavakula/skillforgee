import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  createJob as createJobService,
  getJobs as getJobsService,
  getMyJobs as getMyJobsService,
  getJobById as getJobByIdService,
  updateJob as updateJobService,
  deleteJob as deleteJobService,
  getMyJobs,
} from "../services/job.service.js";

import {
  createJobSchema,
  updateJobSchema,
} from "../validators/job.validator.js";

export const createJob = async (
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
    createJobSchema.parse(req.body);

  const job = await createJobService({
    ...validatedData,
    createdBy: req.userId,
  });

  res.status(201).json({
    success: true,
    message: "Job created successfully",
    data: {
      job,
    },
  });
};

export const getJobs = async (
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const jobs = await getJobsService();

  res.status(200).json({
    success: true,
    message: "Jobs retrieved successfully",
    data: {
      jobs,
    },
  });
};

export const getJobById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid job ID",
    });

    return;
  }

  const job = await getJobByIdService(id);

  res.status(200).json({
    success: true,
    message: "Job retrieved successfully",
    data: {
      job,
    },
  });
};

export const updateJob = async (
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

  if (
    req.userRole !== "RECRUITER" &&
    req.userRole !== "ADMIN"
  ) {
    res.status(403).json({
      success: false,
      message:
        "You do not have permission to manage jobs",
    });
    return;
  }

  const userId: string = req.userId;

  const userRole:
    | "RECRUITER"
    | "ADMIN" =
    req.userRole === "RECRUITER"
      ? "RECRUITER"
      : "ADMIN";

  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid job ID",
    });
    return;
  }

  const validatedData =
    updateJobSchema.parse(req.body);

  const job = await updateJobService(
    id,
    userId,
    userRole,
    validatedData
  );

  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    data: {
      job,
    },
  });
};

export const deleteJob = async (
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

  if (
    req.userRole !== "RECRUITER" &&
    req.userRole !== "ADMIN"
  ) {
    res.status(403).json({
      success: false,
      message:
        "You do not have permission to manage jobs",
    });
    return;
  }

  const userId: string = req.userId;

  const userRole:
    | "RECRUITER"
    | "ADMIN" =
    req.userRole === "RECRUITER"
      ? "RECRUITER"
      : "ADMIN";

  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid job ID",
    });
    return;
  }

  await deleteJobService(
    id,
    userId,
    userRole
  );

  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
};

export const getMyJobsController = async (
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

  const jobs = await getMyJobs(req.userId);

  res.status(200).json({
    success: true,
    message: "Recruiter jobs retrieved successfully",
    data: {
      jobs,
    },
  });
};