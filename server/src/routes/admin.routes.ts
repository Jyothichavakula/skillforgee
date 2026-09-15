import { Router } from "express";

import {
  getAdminDashboardController,
} from "../controllers/admin.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorizeRoles("ADMIN"),
  getAdminDashboardController
);

export default router;