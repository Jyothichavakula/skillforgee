import { Router } from "express";

import {
  updateProblemProgress,
  getMyProblemProgress,
  getProblemProgress,
  getMyProblemStats,
  getMyTopicStats,
  getMyCompanyStats,
} from "../controllers/problemProgress.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Student views all their progress
router.get(
  "/me",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyProblemProgress
);

router.get(
  "/stats",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyProblemStats
);

router.get(
  "/topics",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyTopicStats
);

router.get(
  "/companies",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyCompanyStats
);

// Student views progress for one problem
router.get(
  "/:problemId",
  authenticate,
  authorizeRoles("STUDENT"),
  getProblemProgress
);

// Student updates progress
router.patch(
  "/:problemId",
  authenticate,
  authorizeRoles("STUDENT"),
  updateProblemProgress
);

export default router;