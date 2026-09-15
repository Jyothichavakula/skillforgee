import api from "./axios";

import type { ApiResponse } from "../types/api";

export interface Achievement {
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

export const getMyGamification =
  async (): Promise<GamificationData> => {
    const response =
      await api.get<
        ApiResponse<GamificationData>
      >("/gamification/me");

    return response.data.data;
  };