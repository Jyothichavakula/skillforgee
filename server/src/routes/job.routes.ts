import { Router } from "express";

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Authenticated users can view jobs
router.get("/", authenticate, getJobs);

router.get("/:id", authenticate, getJobById);

// Recruiters and admins can create jobs
router.post(
  "/",
  authenticate,
  authorizeRoles("RECRUITER", "ADMIN"),
  createJob
);

// Recruiters and admins can update jobs
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("RECRUITER", "ADMIN"),
  updateJob
);

// Recruiters and admins can delete jobs
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("RECRUITER", "ADMIN"),
  deleteJob
);

export default router;