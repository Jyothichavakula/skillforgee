import { Router } from "express";

import {
  getStudentDashboardAnalyticsController,
} from "../controllers/analytics.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("STUDENT"),
  getStudentDashboardAnalyticsController
);

export default router;