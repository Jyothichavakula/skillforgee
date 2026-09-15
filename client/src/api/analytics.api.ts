import api from "./axios";

import type { ApiResponse } from "../types/api";

export interface AnalyticsCoding {
  totalTracked: number;
  totalSolved: number;
  totalAttempted: number;
  // Aliases used by some components
  solvedProblems: number;
  attemptedProblems: number;
  totalProblems: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

export interface AnalyticsApplications {
  total: number;
  applied: number;
  shortlisted: number;
  interviews: number;
  selected: number;
  rejected: number;
}

export interface AnalyticsResume {
  atsScore: number;
  fileName?: string;
  analyzedAt?: string;
  strengths?: string[];
  weaknesses?: string[];
  missingSkills?: string[];
  suggestions?: string[];
}

export interface DashboardAnalytics {
  coding: AnalyticsCoding;
  applications: AnalyticsApplications;
  roadmap: {
    completionPercentage: number;
    progressPercentage: number;
    topics: unknown[];
    totalTopics: number;
    completedTopics: number;
  };
  weakTopics?: unknown[];
  companyPreparation?: unknown[];
  resume?: AnalyticsResume | null;
  profile?: unknown;
}

// Backend returns: { success, data: { analytics: {...} } }
export const getDashboardAnalytics =
  async (): Promise<DashboardAnalytics> => {
    const response =
      await api.get<
        ApiResponse<{ analytics: Record<string, unknown> }>
      >("/analytics/dashboard");

    const raw = (response.data.data?.analytics ?? {}) as Record<string, unknown>;
    const rawCoding = (raw.coding ?? {}) as Record<string, unknown>;
    const rawApps = (raw.applications ?? {}) as Record<string, unknown>;
    const rawRoadmap = (raw.roadmap ?? {}) as Record<string, unknown>;
    const rawResume = raw.resume as AnalyticsResume | null | undefined;

    const totalSolved = typeof rawCoding.totalSolved === "number" ? rawCoding.totalSolved : 0;
    const totalAttempted = typeof rawCoding.totalAttempted === "number" ? rawCoding.totalAttempted : 0;
    const completionPct = typeof rawRoadmap.completionPercentage === "number" ? rawRoadmap.completionPercentage : 0;
    const rawTopics = Array.isArray(rawRoadmap.topics) ? rawRoadmap.topics : [];

    return {
      coding: {
        totalTracked: typeof rawCoding.totalTracked === "number" ? rawCoding.totalTracked : 0,
        totalSolved,
        totalAttempted,
        // Aliases so older components that reference these names still work
        solvedProblems: totalSolved,
        attemptedProblems: totalAttempted,
        totalProblems: totalSolved + totalAttempted,
        easySolved: typeof rawCoding.easySolved === "number" ? rawCoding.easySolved : 0,
        mediumSolved: typeof rawCoding.mediumSolved === "number" ? rawCoding.mediumSolved : 0,
        hardSolved: typeof rawCoding.hardSolved === "number" ? rawCoding.hardSolved : 0,
      },
      applications: {
        total: typeof rawApps.total === "number" ? rawApps.total : 0,
        applied: typeof rawApps.applied === "number" ? rawApps.applied : 0,
        shortlisted: typeof rawApps.shortlisted === "number" ? rawApps.shortlisted : 0,
        interviews: typeof rawApps.interviews === "number" ? rawApps.interviews : 0,
        selected: typeof rawApps.selected === "number" ? rawApps.selected : 0,
        rejected: typeof rawApps.rejected === "number" ? rawApps.rejected : 0,
      },
      roadmap: {
        completionPercentage: completionPct,
        progressPercentage: completionPct, // alias used by some components
        topics: rawTopics,
        totalTopics: rawTopics.length,
        completedTopics: rawTopics.filter(
          (t) => (t as Record<string, unknown>)?.status === "COMPLETED"
        ).length,
      },
      weakTopics: Array.isArray(raw.weakTopics) ? raw.weakTopics : [],
      companyPreparation: Array.isArray(raw.companyPreparation) ? raw.companyPreparation : [],
      resume: rawResume ?? null,
      profile: raw.profile,
    };
  };