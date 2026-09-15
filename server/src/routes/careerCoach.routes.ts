import { Router } from "express";

import {
  askCareerCoachController,
} from "../controllers/careerCoach.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post(
  "/ask",
  authenticate,
  authorizeRoles("STUDENT"),
  askCareerCoachController
);

export default router;