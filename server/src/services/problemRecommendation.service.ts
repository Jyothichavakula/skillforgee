import Problem from "../models/Problem.js";
import UserProblemProgress from "../models/UserProblemProgress.js";

interface RecommendationOptions {
  company?: string;
  limit?: number;
}

export const getRecommendedProblems = async (
  userId: string,
  options: RecommendationOptions = {}
) => {
  const limit = options.limit ?? 5;

  // Get all problems the student has already solved
  const solvedProgress = await UserProblemProgress.find({
    userId,
    status: "SOLVED",
  }).select("problemId");

  const solvedProblemIds = solvedProgress.map(
    (progress) => progress.problemId
  );

  // Find active problems that are not solved
  const problems = await Problem.find({
    isActive: true,
    _id: {
      $nin: solvedProblemIds,
    },
  }).lean();

  // Get student's progress for topic analysis
  const progressRecords =
    await UserProblemProgress.find({
      userId,
    })
      .populate("problemId", "topics")
      .lean();

  // Calculate topic performance
  const topicStats: Record<
    string,
    {
      total: number;
      solved: number;
    }
  > = {};

  for (const progress of progressRecords) {
    const problem = progress.problemId as unknown as {
      topics: string[];
    };

    if (!problem?.topics) {
      continue;
    }

    for (const topic of problem.topics) {
      if (!topicStats[topic]) {
        topicStats[topic] = {
          total: 0,
          solved: 0,
        };
      }

      topicStats[topic].total++;

      if (progress.status === "SOLVED") {
        topicStats[topic].solved++;
      }
    }
  }

  // Find weak topics
  const weakTopics = Object.entries(topicStats)
    .filter(([_, stats]) => stats.total > 0)
    .sort((a, b) => {
      const aRate = a[1].solved / a[1].total;
      const bRate = b[1].solved / b[1].total;

      return aRate - bRate;
    })
    .map(([topic]) => topic);

  // Score every available problem
  const scoredProblems = problems.map((problem) => {
    let score = 0;
    const reasons: string[] = [];

    // Company matching
    if (
      options.company &&
      problem.companyTags.some(
        (company) =>
          company.toUpperCase() ===
          options.company!.toUpperCase()
      )
    ) {
      score += 50;

      reasons.push(
        `Relevant for ${options.company} preparation`
      );
    }

    // Weak topic matching
    const matchingWeakTopics = problem.topics.filter(
      (topic) => weakTopics.includes(topic)
    );

    if (matchingWeakTopics.length > 0) {
      score += matchingWeakTopics.length * 20;

      reasons.push(
        `Helps improve weak topic: ${matchingWeakTopics.join(
          ", "
        )}`
      );
    }

    // Difficulty scoring
    if (problem.difficulty === "EASY") {
      score += 10;
    } else if (problem.difficulty === "MEDIUM") {
      score += 15;
    } else {
      score += 5;
    }

    return {
      problem,
      score,
      reason:
        reasons.length > 0
          ? reasons.join(" • ")
          : "Recommended based on your current progress",
    };
  });

  // Sort highest score first
  scoredProblems.sort((a, b) => b.score - a.score);

  // Return only required number
  return scoredProblems
    .slice(0, limit)
    .map((item) => ({
      ...item.problem,
      recommendationScore: item.score,
      reason: item.reason,
    }));
};