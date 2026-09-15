import { Router } from "express";

import {
  createApplication,
  getMyApplications,
  getApplicationById,
  getJobApplicants,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Student applies for a job
router.post(
  "/",
  authenticate,
  authorizeRoles("STUDENT"),
  createApplication
);

// Student views all of their applications
router.get(
  "/me",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyApplications
);

// Student views one of their applications
router.get(
  "/:id",
  authenticate,
  authorizeRoles("STUDENT"),
  getApplicationById
);

// Recruiter/Admin views applicants for a job
router.get(
  "/job/:jobId",
  authenticate,
  authorizeRoles("RECRUITER", "ADMIN"),
  getJobApplicants
);

// Recruiter/Admin updates application status
router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles("RECRUITER", "ADMIN"),
  updateApplicationStatus
);

export default router;