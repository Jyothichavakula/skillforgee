import { Router } from "express";

import { getRecommendedProblemsController } from "../controllers/problemRecommendation.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("STUDENT"),
  getRecommendedProblemsController
);

export default router;