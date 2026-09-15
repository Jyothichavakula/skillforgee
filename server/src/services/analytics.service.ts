import User from "../models/User.js";
import UserProblemProgress from "../models/UserProblemProgress.js";
import Application from "../models/Application.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";
import Problem from "../models/Problem.js";

import { getStudentRoadmap } from "./roadmap.service.js";

export const getStudentDashboardAnalytics = async (
  userId: string
) => {
  const user = await User.findById(userId).select(
    "firstName lastName email university degree graduationYear skills"
  );

  if (!user) {
    throw new Error("User not found");
  }

  // ========================================
  // CODING ANALYTICS
  // ========================================

  const progressRecords =
    await UserProblemProgress.find({
      userId,
    })
      .populate(
        "problemId",
        "title difficulty topics companyTags"
      )
      .lean();

  let totalSolved = 0;
  let totalAttempted = 0;

  let easySolved = 0;
  let mediumSolved = 0;
  let hardSolved = 0;

  const topicStats: Record<
    string,
    {
      total: number;
      solved: number;
      attempted: number;
    }
  > = {};

  const companyStats: Record<
    string,
    {
      total: number;
      solved: number;
      attempted: number;
    }
  > = {};

  for (const progress of progressRecords) {
    const problem = progress.problemId as unknown as {
      difficulty:
        | "EASY"
        | "MEDIUM"
        | "HARD";
      topics: string[];
      companyTags: string[];
    };

    if (!problem) {
      continue;
    }

    if (progress.status === "SOLVED") {
      totalSolved++;

      if (problem.difficulty === "EASY") {
        easySolved++;
      }

      if (problem.difficulty === "MEDIUM") {
        mediumSolved++;
      }

      if (problem.difficulty === "HARD") {
        hardSolved++;
      }
    }

    if (progress.status === "ATTEMPTED") {
      totalAttempted++;
    }

    // Topic statistics
    for (const topic of problem.topics ?? []) {
      if (!topicStats[topic]) {
        topicStats[topic] = {
          total: 0,
          solved: 0,
          attempted: 0,
        };
      }

      topicStats[topic].total++;

      if (progress.status === "SOLVED") {
        topicStats[topic].solved++;
      }

      if (progress.status === "ATTEMPTED") {
        topicStats[topic].attempted++;
      }
    }

    // Company statistics
    for (const company of problem.companyTags ?? []) {
      if (!companyStats[company]) {
        companyStats[company] = {
          total: 0,
          solved: 0,
          attempted: 0,
        };
      }

      companyStats[company].total++;

      if (progress.status === "SOLVED") {
        companyStats[company].solved++;
      }

      if (progress.status === "ATTEMPTED") {
        companyStats[company].attempted++;
      }
    }
  }

  // ========================================
  // TOPIC ANALYTICS
  // ========================================

  const weakTopics = Object.entries(topicStats)
    .map(([topic, stats]) => ({
      topic,

      total: stats.total,

      solved: stats.solved,

      attempted: stats.attempted,

      completionPercentage:
        stats.total === 0
          ? 0
          : Math.round(
              (stats.solved / stats.total) * 100
            ),
    }))
    .sort(
      (a, b) =>
        a.completionPercentage -
        b.completionPercentage
    )
    .slice(0, 5);

  // ========================================
  // COMPANY ANALYTICS
  // ========================================

  const companyPreparation = Object.entries(
    companyStats
  )
    .map(([company, stats]) => ({
      company,

      totalProblems: stats.total,

      solvedProblems: stats.solved,

      attemptedProblems: stats.attempted,

      completionPercentage:
        stats.total === 0
          ? 0
          : Math.round(
              (stats.solved / stats.total) * 100
            ),
    }))
    .sort(
      (a, b) =>
        b.completionPercentage -
        a.completionPercentage
    );

  // ========================================
  // APPLICATION ANALYTICS
  // ========================================

  const applications =
    await Application.find({
      studentId: userId,
    }).lean();

  const totalApplications =
    applications.length;

  const applied =
    applications.filter(
      (application) =>
        application.status === "APPLIED"
    ).length;

  const shortlisted =
    applications.filter(
      (application) =>
        application.status === "SHORTLISTED"
    ).length;

  const interviews =
    applications.filter(
      (application) =>
        application.status === "INTERVIEW"
    ).length;

  const selected =
    applications.filter(
      (application) =>
        application.status === "SELECTED"
    ).length;

  const rejected =
    applications.filter(
      (application) =>
        application.status === "REJECTED"
    ).length;

  // ========================================
  // RESUME ANALYTICS
  // ========================================

  const latestResumeAnalysis =
    await ResumeAnalysis.findOne({
      userId,
    })
      .sort({
        createdAt: -1,
      })
      .select(
        "atsScore fileName analyzedAt strengths weaknesses missingSkills suggestions"
      )
      .lean();

  // ========================================
  // ROADMAP ANALYTICS
  // ========================================

  const roadmap =
    await getStudentRoadmap(userId);

  let roadmapCompletion = 0;

  if (roadmap.length > 0) {
    roadmapCompletion = Math.round(
      roadmap.reduce(
        (sum, topic) =>
          sum + topic.completionPercentage,
        0
      ) / roadmap.length
    );
  }

  // ========================================
  // RETURN DASHBOARD
  // ========================================

  return {
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      university: user.university ?? null,
      degree: user.degree ?? null,
      graduationYear:
        user.graduationYear ?? null,
      skills: user.skills,
    },

    coding: {
      totalTracked:
        progressRecords.length,

      totalSolved,

      totalAttempted,

      easySolved,

      mediumSolved,

      hardSolved,
    },

    applications: {
      total: totalApplications,
      applied,
      shortlisted,
      interviews,
      selected,
      rejected,
    },

    resume: latestResumeAnalysis
      ? {
          atsScore:
            latestResumeAnalysis.atsScore,

          fileName:
            latestResumeAnalysis.fileName,

          analyzedAt:
            latestResumeAnalysis.analyzedAt,

          strengths:
            latestResumeAnalysis.strengths,

          weaknesses:
            latestResumeAnalysis.weaknesses,

          missingSkills:
            latestResumeAnalysis.missingSkills,

          suggestions:
            latestResumeAnalysis.suggestions,
        }
      : null,

    roadmap: {
      completionPercentage:
        roadmapCompletion,

      topics: roadmap,
    },

    weakTopics,

    companyPreparation,
  };
};