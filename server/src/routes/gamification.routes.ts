import { Router } from "express";

import {
  getMyGamificationController,
  getLeaderboardController,
} from "../controllers/gamification.controller.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/me",
  authenticate,
  getMyGamificationController
);

router.get(
  "/leaderboard",
  authenticate,
  getLeaderboardController
);

export default router;