import { Router } from "express";

import {
  analyzeResumeController,
  getMyResumeAnalysesController,
  getResumeAnalysisByIdController,
} from "../controllers/resumeAnalyzer.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { uploadResume } from "../middleware/upload.middleware.js";

const router = Router();

router.post(
  "/analyze",
  authenticate,
  authorizeRoles("STUDENT"),
  uploadResume.single("resume"),
  analyzeResumeController
);

router.get(
  "/me",
  authenticate,
  authorizeRoles("STUDENT"),
  getMyResumeAnalysesController
);

router.get(
  "/:id",
  authenticate,
  authorizeRoles("STUDENT"),
  getResumeAnalysisByIdController
);

export default router;