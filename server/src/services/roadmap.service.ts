import Problem from "../models/Problem.js";
import UserProblemProgress from "../models/UserProblemProgress.js";

type RoadmapStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED";

interface TopicRoadmap {
  topic: string;
  totalProblems: number;
  solvedProblems: number;
  attemptedProblems: number;
  completionPercentage: number;
  status: RoadmapStatus;
}

export const getStudentRoadmap = async (
  userId: string
): Promise<TopicRoadmap[]> => {
  // Get all active problems
  const problems = await Problem.find({
    isActive: true,
  }).lean();

  // Get student's progress
  const progressRecords =
    await UserProblemProgress.find({
      userId,
    }).lean();

  // Create quick lookup:
  // problemId -> progress
  const progressMap = new Map<
    string,
    {
      status: string;
    }
  >();

  for (const progress of progressRecords) {
    progressMap.set(
      progress.problemId.toString(),
      {
        status: progress.status,
      }
    );
  }

  // Store topic statistics
  const topicStats: Record<
    string,
    {
      totalProblems: number;
      solvedProblems: number;
      attemptedProblems: number;
    }
  > = {};

  // Process every problem
  for (const problem of problems) {
    for (const topic of problem.topics) {
      if (!topicStats[topic]) {
        topicStats[topic] = {
          totalProblems: 0,
          solvedProblems: 0,
          attemptedProblems: 0,
        };
      }

      topicStats[topic].totalProblems++;

      const progress = progressMap.get(
        problem._id.toString()
      );

      if (!progress) {
        continue;
      }

      if (progress.status === "SOLVED") {
        topicStats[topic].solvedProblems++;
      } else if (
        progress.status === "ATTEMPTED"
      ) {
        topicStats[topic].attemptedProblems++;
      }
    }
  }

  // Convert statistics into roadmap
  const roadmap: TopicRoadmap[] = Object.entries(
    topicStats
  ).map(([topic, stats]) => {
    const completionPercentage =
      stats.totalProblems === 0
        ? 0
        : Math.round(
            (stats.solvedProblems /
              stats.totalProblems) *
              100
          );

    let status: RoadmapStatus;

    if (
      stats.solvedProblems ===
      stats.totalProblems
    ) {
      status = "COMPLETED";
    } else if (
      stats.solvedProblems > 0 ||
      stats.attemptedProblems > 0
    ) {
      status = "IN_PROGRESS";
    } else {
      status = "NOT_STARTED";
    }

    return {
      topic,
      totalProblems: stats.totalProblems,
      solvedProblems: stats.solvedProblems,
      attemptedProblems: stats.attemptedProblems,
      completionPercentage,
      status,
    };
  });

  // Sort:
  // In-progress topics first,
  // then not-started,
  // completed last
  roadmap.sort((a, b) => {
    const statusOrder: Record<
      RoadmapStatus,
      number
    > = {
      IN_PROGRESS: 1,
      NOT_STARTED: 2,
      COMPLETED: 3,
    };

    return (
      statusOrder[a.status] -
      statusOrder[b.status]
    );
  });

  return roadmap;
};