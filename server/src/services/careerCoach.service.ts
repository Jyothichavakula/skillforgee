import User from "../models/User.js";
import UserProblemProgress from "../models/UserProblemProgress.js";
import Application from "../models/Application.js";

import {
  getStudentRoadmap,
} from "./roadmap.service.js";

import {
  generateAIResponse,
} from "../ai/ai.service.js";

interface CareerCoachInput {
  userId: string;
  message: string;
  targetCompany?: string;
}

export const askCareerCoach = async (
  data: CareerCoachInput
) => {
  // --------------------------------------------------
  // 1. Get student profile
  // --------------------------------------------------

  const user = await User.findById(data.userId).select(
    "firstName lastName university degree graduationYear skills"
  );

  if (!user) {
    throw new Error("User not found");
  }

  // --------------------------------------------------
  // 2. Get coding progress
  // --------------------------------------------------

  const progressRecords =
    await UserProblemProgress.find({
      userId: data.userId,
    })
      .populate(
        "problemId",
        "title difficulty topics companyTags"
      )
      .lean();

  let solvedProblems = 0;
  let attemptedProblems = 0;

  let easySolved = 0;
  let mediumSolved = 0;
  let hardSolved = 0;

  // --------------------------------------------------
  // 3. Topic statistics
  // --------------------------------------------------

  const topicStats: Record<
    string,
    {
      total: number;
      solved: number;
      attempted: number;
    }
  > = {};

  // --------------------------------------------------
  // 4. Company statistics
  // --------------------------------------------------

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
      title: string;
      difficulty: "EASY" | "MEDIUM" | "HARD";
      topics: string[];
      companyTags: string[];
    };

    if (!problem) {
      continue;
    }

    // -----------------------------
    // Overall coding statistics
    // -----------------------------

    if (progress.status === "SOLVED") {
      solvedProblems++;

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
      attemptedProblems++;
    }

    // -----------------------------
    // Topic statistics
    // -----------------------------

    if (problem.topics) {
      for (const topic of problem.topics) {
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
    }

    // -----------------------------
    // Company statistics
    // -----------------------------

    if (problem.companyTags) {
      for (const company of problem.companyTags) {
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
  }

  // --------------------------------------------------
  // 5. Identify weak topics
  // --------------------------------------------------

  const weakTopics = Object.entries(topicStats)
    .filter(([_, stats]) => stats.total > 0)
    .map(([topic, stats]) => ({
      topic,
      completionPercentage: Math.round(
        (stats.solved / stats.total) * 100
      ),
      total: stats.total,
      solved: stats.solved,
      attempted: stats.attempted,
    }))
    .sort(
      (a, b) =>
        a.completionPercentage -
        b.completionPercentage
    )
    .slice(0, 5);

  // --------------------------------------------------
  // 6. Get learning roadmap
  // --------------------------------------------------

  const roadmap = await getStudentRoadmap(
    data.userId
  );

  // --------------------------------------------------
  // 7. Get application history
  // --------------------------------------------------

  const applications = await Application.find({
    studentId: data.userId,
  })
    .populate({
      path: "jobId",
      select: "title jobType status companyId",
      populate: {
        path: "companyId",
        select: "name",
      },
    })
    .sort({
      appliedAt: -1,
    })
    .limit(10)
    .lean();

  const applicationSummary = applications.map(
    (application) => {
      const job = application.jobId as unknown as {
        title: string;
        jobType: string;
        status: string;
        companyId?: {
          name: string;
        };
      };

      return {
        jobTitle: job?.title ?? "Unknown",
        jobType: job?.jobType ?? "Unknown",
        company:
          job?.companyId?.name ?? "Unknown",
        applicationStatus: application.status,
      };
    }
  );

  // --------------------------------------------------
  // 8. Prepare company statistics
  // --------------------------------------------------

  const companyPreparation = Object.entries(
    companyStats
  )
    .map(([company, stats]) => ({
      company,
      totalProblems: stats.total,
      solvedProblems: stats.solved,
      attemptedProblems: stats.attempted,
      completionPercentage: Math.round(
        (stats.solved / stats.total) * 100
      ),
    }))
    .sort(
      (a, b) =>
        b.completionPercentage -
        a.completionPercentage
    );

  // --------------------------------------------------
  // 9. Prepare roadmap summary
  // --------------------------------------------------

  const roadmapSummary = roadmap.map((item) => ({
    topic: item.topic,
    totalProblems: item.totalProblems,
    solvedProblems: item.solvedProblems,
    attemptedProblems: item.attemptedProblems,
    completionPercentage:
      item.completionPercentage,
    status: item.status,
  }));

  // --------------------------------------------------
  // 10. Build AI system instructions
  // --------------------------------------------------

  const systemMessage = `
You are SkillForge AI Career Coach — a friendly, conversational, and highly knowledgeable career guidance assistant.

You have access to the student's REAL SkillForge data (provided below). Use this data ONLY when it is relevant to what the student actually asks or says.

CRITICAL BEHAVIOR RULES:
1. Respond naturally to what the student actually says. If they say "hello", "hi", or greet you — greet them warmly and briefly ask how you can help. Do NOT dump their profile analysis on a greeting.
2. Only analyze or mention their profile data when the student asks something that requires it (e.g., "how am I doing?", "what should I study?", "am I ready for placements?", "give me a study plan").
3. Be conversational and human. Vary your tone and responses. Do not use the same template every time.
4. When giving advice, be specific and actionable — reference their actual topics, problems, application statuses, etc.
5. If information is missing (e.g., no university set), mention it briefly but don't make it the main focus.
6. Do not claim the student is placement-ready unless the data actually supports it.
7. Keep responses appropriately concise — don't write essays for simple questions or greetings.
8. For technical questions (algorithms, data structures, interview prep), give real, detailed technical answers.

========================================
STUDENT PROFILE (use when relevant)
========================================

Name: ${user.firstName} ${user.lastName}
University: ${user.university ?? "Not provided"}
Degree: ${user.degree ?? "Not provided"}
Graduation Year: ${user.graduationYear ?? "Not provided"}
Skills: ${user.skills.length > 0 ? user.skills.join(", ") : "Not added yet"}
Target Company: ${data.targetCompany ?? "Not specified"}

========================================
CODING PERFORMANCE
========================================

Problems Solved: ${solvedProblems} (Easy: ${easySolved}, Medium: ${mediumSolved}, Hard: ${hardSolved})
Problems Attempted: ${attemptedProblems}

Weak Topics:
${weakTopics.length > 0 ? JSON.stringify(weakTopics, null, 2) : "No coding topic data yet"}

Company Preparation:
${companyPreparation.length > 0 ? JSON.stringify(companyPreparation, null, 2) : "No company-specific data yet"}

========================================
LEARNING ROADMAP
========================================

${roadmapSummary.length > 0 ? JSON.stringify(roadmapSummary, null, 2) : "Roadmap not started yet"}

========================================
APPLICATION HISTORY (last 10)
========================================

${applicationSummary.length > 0 ? JSON.stringify(applicationSummary, null, 2) : "No applications submitted yet"}

========================================

Remember: Respond to what the student ACTUALLY SAYS. Be a real, helpful coach — not a profile-reader bot.
`;

  // --------------------------------------------------
  // 11. Send context + question to AI
  // --------------------------------------------------

  const response = await generateAIResponse([
    {
      role: "system",
      content: systemMessage,
    },
    {
      role: "user",
      content: data.message,
    },
  ]);

  // --------------------------------------------------
  // 12. Return response
  // --------------------------------------------------

  return {
    question: data.message,

    answer: response.content,

    studentContext: {
      solvedProblems,
      attemptedProblems,
      easySolved,
      mediumSolved,
      hardSolved,
      weakTopics,
      companyPreparation,
      roadmap: roadmapSummary,
      applications: applicationSummary,
      targetCompany:
        data.targetCompany ?? null,
    },
  };
};