import { Router } from "express";

import {
  createProblem,
  getProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} from "../controllers/problem.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Students can view problems
router.get(
  "/",
  authenticate,
  getProblems
);

router.get(
  "/:id",
  authenticate,
  getProblemById
);

// Admin manages problem catalog
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  createProblem
);

router.patch(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  updateProblem
);

router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  deleteProblem
);

export default router;