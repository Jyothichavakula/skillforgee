import { Router } from "express";

import { getRoadmap } from "../controllers/roadmap.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorizeRoles("STUDENT"),
  getRoadmap
);

export default router;