import { Router } from "express";

import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  register,
  login,
  refresh,
  logout,
  getMe,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/refresh", authRateLimiter, refresh);
router.post("/logout", authRateLimiter, logout);

router.get("/me", authenticate, getMe);



export default router;