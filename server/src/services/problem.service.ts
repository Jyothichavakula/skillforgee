import Problem from "../models/Problem.js";

interface CreateProblemInput {
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  topics?: string[];
  companyTags?: string[];
  leetcodeUrl: string;
  description?: string;
}

interface ProblemFilters {
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  topic?: string;
  company?: string;
}

export const createProblem = async (
  data: CreateProblemInput
) => {
  const existingProblem = await Problem.findOne({
    title: data.title,
  });

  if (existingProblem) {
    throw new Error("Problem already exists");
  }

  return Problem.create(data);
};

export const getProblems = async (
  filters: ProblemFilters = {}
) => {
  const query: Record<string, unknown> = {
    isActive: true,
  };

  // Filter by difficulty
  if (filters.difficulty) {
    query.difficulty = filters.difficulty;
  }

  // Filter by topic
  if (filters.topic) {
    query.topics = {
      $in: [filters.topic.toUpperCase()],
    };
  }

  // Filter by company
  if (filters.company) {
    query.companyTags = {
      $in: [filters.company.toUpperCase()],
    };
  }

  return Problem.find(query).sort({
    createdAt: -1,
  });
};

export const getProblemById = async (
  problemId: string
) => {
  const problem = await Problem.findOne({
    _id: problemId,
    isActive: true,
  });

  if (!problem) {
    throw new Error("Problem not found");
  }

  return problem;
};

export const updateProblem = async (
  problemId: string,
  data: Partial<CreateProblemInput> & {
    isActive?: boolean;
  }
) => {
  const problem = await Problem.findByIdAndUpdate(
    problemId,
    { $set: data },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!problem) {
    throw new Error("Problem not found");
  }

  return problem;
};

export const deleteProblem = async (
  problemId: string
) => {
  const problem = await Problem.findByIdAndUpdate(
    problemId,
    {
      $set: {
        isActive: false,
      },
    },
    {
      new: true,
    }
  );

  if (!problem) {
    throw new Error("Problem not found");
  }

  return problem;
};