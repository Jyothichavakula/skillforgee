import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  createProblem as createProblemService,
  getProblems as getProblemsService,
  getProblemById as getProblemByIdService,
  updateProblem as updateProblemService,
  deleteProblem as deleteProblemService,
} from "../services/problem.service.js";

import {
  createProblemSchema,
  updateProblemSchema,
} from "../validators/problem.validator.js";

export const createProblem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const validatedData = createProblemSchema.parse(
    req.body
  );

  const problem =
    await createProblemService(validatedData);

  res.status(201).json({
    success: true,
    message: "Problem created successfully",
    data: {
      problem,
    },
  });
};

export const getProblems = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { difficulty, topic, company } = req.query;

  let validatedDifficulty:
    | "EASY"
    | "MEDIUM"
    | "HARD"
    | undefined;

  if (typeof difficulty === "string") {
    const upperDifficulty = difficulty.toUpperCase();

    if (
      upperDifficulty !== "EASY" &&
      upperDifficulty !== "MEDIUM" &&
      upperDifficulty !== "HARD"
    ) {
      res.status(400).json({
        success: false,
        message:
          "Difficulty must be EASY, MEDIUM, or HARD",
      });
      return;
    }

    validatedDifficulty = upperDifficulty as
      | "EASY"
      | "MEDIUM"
      | "HARD";
  }

  const filters = {
    difficulty: validatedDifficulty,
    topic:
      typeof topic === "string"
        ? topic
        : undefined,
    company:
      typeof company === "string"
        ? company
        : undefined,
  };

  const problems =
    await getProblemsService(filters);

  res.status(200).json({
    success: true,
    message: "Problems retrieved successfully",
    data: {
      problems,
    },
  });
};

export const getProblemById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid problem ID",
    });
    return;
  }

  const problem =
    await getProblemByIdService(id);

  res.status(200).json({
    success: true,
    message: "Problem retrieved successfully",
    data: {
      problem,
    },
  });
};

export const updateProblem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid problem ID",
    });
    return;
  }

  const validatedData =
    updateProblemSchema.parse(req.body);

  const problem =
    await updateProblemService(
      id,
      validatedData
    );

  res.status(200).json({
    success: true,
    message: "Problem updated successfully",
    data: {
      problem,
    },
  });
};

export const deleteProblem = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid problem ID",
    });
    return;
  }

  await deleteProblemService(id);

  res.status(200).json({
    success: true,
    message: "Problem deleted successfully",
  });
};