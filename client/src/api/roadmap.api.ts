import api from "./axios";
import type { ApiResponse } from "../types/api";

export interface RoadmapTopic {
  topic: string;
  totalProblems: number;
  solvedProblems: number;
  attemptedProblems: number;
  progressPercentage: number;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

export interface RoadmapData {
  topics: RoadmapTopic[];
  totalTopics: number;
  completedTopics: number;
  overallProgressPercentage: number;
}

export const getMyRoadmap =
  async (): Promise<RoadmapData> => {
    const response =
      await api.get<
        ApiResponse<RoadmapData>
      >("/roadmap");

    return response.data.data;
  };