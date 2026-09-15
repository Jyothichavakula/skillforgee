import mongoose from "mongoose";

import UserGamification from "../models/UserGamification.js";

type ProblemDifficulty =
  | "EASY"
  | "MEDIUM"
  | "HARD";

const getXpForDifficulty = (
  difficulty: ProblemDifficulty
): number => {
  if (difficulty === "EASY") {
    return 10;
  }

  if (difficulty === "MEDIUM") {
    return 20;
  }

  return 30;
};

const calculateLevel = (
  xp: number
): number => {
  return Math.floor(xp / 100) + 1;
};

const achievementThresholds = [
  {
    code: "FIRST_SOLVE" as const,
    problemsSolved: 1,
  },
  {
    code: "TEN_SOLVES" as const,
    problemsSolved: 10,
  },
  {
    code: "TWENTY_FIVE_SOLVES" as const,
    problemsSolved: 25,
  },
  {
    code: "FIFTY_SOLVES" as const,
    problemsSolved: 50,
  },
  {
    code: "HUNDRED_SOLVES" as const,
    problemsSolved: 100,
  },
];

export const awardProblemSolvedXp =
  async (
    userId: string,
    difficulty: ProblemDifficulty
  ) => {
    let gamification =
      await UserGamification.findOne({
        userId,
      });

    if (!gamification) {
      gamification =
        await UserGamification.create({
          userId: new mongoose.Types.ObjectId(
            userId
          ),

          xp: 0,

          level: 1,

          problemsSolved: 0,

          achievements: [],
        });
    }

    const xpEarned =
      getXpForDifficulty(difficulty);

    gamification.xp += xpEarned;

    gamification.problemsSolved += 1;

    gamification.level =
      calculateLevel(gamification.xp);

    for (
      const achievement of achievementThresholds
    ) {
      const alreadyUnlocked =
        gamification.achievements.some(
          (item) =>
            item.code === achievement.code
        );

      if (
        !alreadyUnlocked &&
        gamification.problemsSolved >=
          achievement.problemsSolved
      ) {
        gamification.achievements.push({
          code: achievement.code,
          unlockedAt: new Date(),
        });
      }
    }

    await gamification.save();

    return {
      xpEarned,

      totalXp: gamification.xp,

      level: gamification.level,

      problemsSolved:
        gamification.problemsSolved,

      achievements:
        gamification.achievements,
    };
  };

export const getMyGamification =
  async (userId: string) => {
    let gamification =
      await UserGamification.findOne({
        userId,
      });

    if (!gamification) {
      gamification =
        await UserGamification.create({
          userId:
            new mongoose.Types.ObjectId(
              userId
            ),

          xp: 0,

          level: 1,

          problemsSolved: 0,

          achievements: [],
        });
    }

    return gamification;
  };

export const getLeaderboard =
  async (limit = 20) => {
    return UserGamification.find()
      .sort({
        xp: -1,
      })
      .limit(limit)
      .populate(
        "userId",
        "firstName lastName avatar university"
      )
      .lean();
  };