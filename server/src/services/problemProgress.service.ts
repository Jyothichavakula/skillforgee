import UserProblemProgress from "../models/UserProblemProgress.js";
import Problem from "../models/Problem.js";

import {
  awardProblemSolvedXp,
} from "./gamification.service.js";

type ProblemProgressStatus =
  | "NOT_STARTED"
  | "ATTEMPTED"
  | "SOLVED";

export const updateProblemProgress = async (
  userId: string,
  problemId: string,
  status: ProblemProgressStatus
) => {
  // Check that the problem exists
  const problem = await Problem.findOne({
    _id: problemId,
    isActive: true,
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  // Find existing progress
  let progress = await UserProblemProgress.findOne({
    userId,
    problemId,
  });

  // Create progress if it doesn't exist
  if (!progress) {
    progress = await UserProblemProgress.create({
      userId,
      problemId,
      status,
      attempts: status === "ATTEMPTED" ? 1 : 0,
      solvedAt:
        status === "SOLVED" ? new Date() : undefined,
    });

    return progress;
  }

  // Increase attempts when changing to ATTEMPTED
  if (
    status === "ATTEMPTED" &&
    progress.status !== "ATTEMPTED"
  ) {
    progress.attempts += 1;
  }

  // Mark solved
  if (
  status === "SOLVED" &&
  progress.status !== "SOLVED"
) {
  progress.solvedAt = new Date();

  await awardProblemSolvedXp(
    userId,
    problem.difficulty
  );
}

  progress.status = status;

  await progress.save();

  return progress;
};

export const getMyProblemProgress = async (
  userId: string
) => {
  return UserProblemProgress.find({
    userId,
  })
    .populate(
      "problemId",
      "title difficulty topics companyTags leetcodeUrl"
    )
    .sort({
      updatedAt: -1,
    });
};

export const getProblemProgress = async (
  userId: string,
  problemId: string
) => {
  const progress = await UserProblemProgress.findOne({
    userId,
    problemId,
  }).populate(
    "problemId",
    "title difficulty topics companyTags leetcodeUrl"
  );

  if (!progress) {
    return null;
  }

  return progress;
};

export const getMyProblemStats = async (
  userId: string
) => {
  const progressRecords =
    await UserProblemProgress.find({
      userId,
    }).populate(
      "problemId",
      "difficulty topics companyTags"
    );

  let solved = 0;
  let attempted = 0;
  let notStarted = 0;

  let easy = 0;
  let medium = 0;
  let hard = 0;

  for (const progress of progressRecords) {
    if (progress.status === "SOLVED") {
      solved++;
    } else if (progress.status === "ATTEMPTED") {
      attempted++;
    } else {
      notStarted++;
    }

    const problem = progress.problemId as unknown as {
      difficulty: "EASY" | "MEDIUM" | "HARD";
    };

    if (problem.difficulty === "EASY") {
      easy++;
    } else if (problem.difficulty === "MEDIUM") {
      medium++;
    } else if (problem.difficulty === "HARD") {
      hard++;
    }
  }

  return {
    totalTracked: progressRecords.length,
    solved,
    attempted,
    notStarted,
    difficulty: {
      easy,
      medium,
      hard,
    },
  };
};
export const getMyTopicStats = async (
  userId: string
) => {
  const progressRecords =
    await UserProblemProgress.find({
      userId,
    }).populate(
      "problemId",
      "difficulty topics companyTags"
    );

  const topicStats: Record<
    string,
    {
      total: number;
      solved: number;
      attempted: number;
    }
  > = {};

  for (const progress of progressRecords) {
    const problem = progress.problemId as unknown as {
      topics: string[];
    };

    if (!problem || !problem.topics) {
      continue;
    }

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

  return topicStats;
};

export const getMyCompanyStats = async (
  userId: string
) => {
  const progressRecords =
    await UserProblemProgress.find({
      userId,
    }).populate(
      "problemId",
      "difficulty topics companyTags"
    );

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
      companyTags: string[];
    };

    if (!problem || !problem.companyTags) {
      continue;
    }

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

  return companyStats;
};