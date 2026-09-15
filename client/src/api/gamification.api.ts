import api from "./axios";

import type { ApiResponse } from "../types/api";

export interface Achievement {
  code?: string;
  type?: string;
  name?: string;
  description?: string;
  unlockedAt?: string;
  [key: string]: unknown;
}

export interface GamificationData {
  xp: number;
  level: number;
  problemsSolved: number;
  achievements: Achievement[];
}

// Backend returns: { success, data: { gamification: {...} } }
export const getMyGamification =
  async (): Promise<GamificationData> => {
    const response =
      await api.get<
        ApiResponse<{ gamification: Record<string, unknown> }>
      >("/gamification/me");

    const raw = response.data.data?.gamification ?? {};

    return {
      xp: typeof raw.xp === "number" ? raw.xp : 0,
      level: typeof raw.level === "number" ? raw.level : 1,
      problemsSolved:
        typeof raw.problemsSolved === "number"
          ? raw.problemsSolved
          : 0,
      achievements: Array.isArray(raw.achievements)
        ? (raw.achievements as Achievement[])
        : [],
    };
  };