import { Router } from "express";

import {
  getRecruiterDashboardController,
} from "../controllers/recruiter.controller.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

import {
  authorizeRoles,
} from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("RECRUITER"),
  getRecruiterDashboardController
);

export default router;