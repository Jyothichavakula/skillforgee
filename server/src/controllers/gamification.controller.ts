import { Response } from "express";

import {
  AuthenticatedRequest,
} from "../middleware/auth.middleware.js";

import {
  getMyGamification,
  getLeaderboard,
} from "../services/gamification.service.js";

export const getMyGamificationController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message:
          "User authentication required",
      });

      return;
    }

    const gamification =
      await getMyGamification(
        req.userId
      );

    res.status(200).json({
      success: true,

      message:
        "Gamification data retrieved successfully",

      data: {
        gamification,
      },
    });
  };

export const getLeaderboardController =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const rawLimit = req.query.limit;

    let limit = 20;

    if (typeof rawLimit === "string") {
      const parsedLimit =
        Number(rawLimit);

      if (
        !Number.isInteger(parsedLimit) ||
        parsedLimit < 1 ||
        parsedLimit > 100
      ) {
        res.status(400).json({
          success: false,
          message:
            "Limit must be an integer between 1 and 100",
        });

        return;
      }

      limit = parsedLimit;
    }

    const leaderboard =
      await getLeaderboard(limit);

    const rankedLeaderboard =
      leaderboard.map(
        (entry, index) => ({
          rank: index + 1,

          user: entry.userId,

          xp: entry.xp,

          level: entry.level,

          problemsSolved:
            entry.problemsSolved,

          achievements:
            entry.achievements.length,
        })
      );

    res.status(200).json({
      success: true,

      message:
        "Leaderboard retrieved successfully",

      data: {
        leaderboard:
          rankedLeaderboard,
      },
    });
  };