import { Router } from "express";

import {
  register,
  login,
  getMe,
  refresh,
  logout,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

// ========================================
// REGISTER
// ========================================

router.post(
  "/register",
  authRateLimiter,
  register
);

// ========================================
// LOGIN
// ========================================

router.post(
  "/login",
  authRateLimiter,
  login
);

// ========================================
// CURRENT USER
// ========================================

router.get(
  "/me",
  authenticate,
  getMe
);

// ========================================
// REFRESH ACCESS TOKEN
// ========================================

router.post(
  "/refresh",
  refresh
);

// ========================================
// LOGOUT
// ========================================

router.post(
  "/logout",
  logout
);

export default router;