import { Router } from "express";

import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

// Any authenticated user can view companies
router.get("/", authenticate, getCompanies);

router.get("/:id", authenticate, getCompanyById);

// Recruiters and admins can create companies
router.post(
  "/",
  authenticate,
  authorizeRoles("RECRUITER", "ADMIN"),
  createCompany
);

// Recruiters and admins can update companies
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("RECRUITER", "ADMIN"),
  updateCompany
);

// Only admins can delete companies
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  deleteCompany
);

export default router;