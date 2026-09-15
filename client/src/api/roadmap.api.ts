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
    // The backend returns { data: { roadmap: TopicRoadmap[] } }
    // We type it as any[] to safely map it
    const response =
      await api.get<
        ApiResponse<{ roadmap: any[] }>
      >("/roadmap");

    const rawTopics = response.data.data?.roadmap || [];

    let completedTopics = 0;
    let totalSolved = 0;
    let totalProblems = 0;

    const topics: RoadmapTopic[] = rawTopics.map((t) => {
      if (t.status === "COMPLETED") completedTopics++;
      totalSolved += t.solvedProblems || 0;
      totalProblems += t.totalProblems || 0;

      return {
        topic: t.topic,
        totalProblems: t.totalProblems,
        solvedProblems: t.solvedProblems,
        attemptedProblems: t.attemptedProblems,
        progressPercentage: t.completionPercentage,
        status: t.status,
      };
    });

    const overallProgressPercentage =
      totalProblems === 0
        ? 0
        : Math.round((totalSolved / totalProblems) * 100);

    return {
      topics,
      totalTopics: topics.length,
      completedTopics,
      overallProgressPercentage,
    };
  };