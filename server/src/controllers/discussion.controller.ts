import { Response } from "express";

import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

import {
  createDiscussion as createDiscussionService,
  getDiscussions as getDiscussionsService,
  getDiscussionById as getDiscussionByIdService,
  updateDiscussion as updateDiscussionService,
  deleteDiscussion as deleteDiscussionService,
  addComment as addCommentService,
  deleteComment as deleteCommentService,
  toggleDiscussionLike as toggleDiscussionLikeService,
} from "../services/discussion.service.js";

import {
  createDiscussionSchema,
  updateDiscussionSchema,
  createCommentSchema,
} from "../validators/discussion.validator.js";

// ========================================
// CREATE DISCUSSION
// ========================================

export const createDiscussion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const validatedData =
    createDiscussionSchema.parse(req.body);

  const discussion =
    await createDiscussionService({
      ...validatedData,
      authorId: req.userId,
    });

  res.status(201).json({
    success: true,
    message: "Discussion created successfully",
    data: {
      discussion,
    },
  });
};

// ========================================
// GET DISCUSSIONS
// ========================================

export const getDiscussions = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const category =
    typeof req.query.category === "string"
      ? req.query.category
      : undefined;

  const discussions =
    await getDiscussionsService(category);

  res.status(200).json({
    success: true,
    message: "Discussions retrieved successfully",
    data: {
      discussions,
    },
  });
};

// ========================================
// GET DISCUSSION BY ID
// ========================================

export const getDiscussionById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid discussion ID",
    });
    return;
  }

  const result =
    await getDiscussionByIdService(id);

  res.status(200).json({
    success: true,
    message: "Discussion retrieved successfully",
    data: result,
  });
};

// ========================================
// UPDATE DISCUSSION
// ========================================

export const updateDiscussion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid discussion ID",
    });
    return;
  }

  const validatedData =
    updateDiscussionSchema.parse(req.body);

  const discussion =
    await updateDiscussionService(
      id,
      req.userId,
      validatedData
    );

  res.status(200).json({
    success: true,
    message: "Discussion updated successfully",
    data: {
      discussion,
    },
  });
};

// ========================================
// DELETE DISCUSSION
// ========================================

export const deleteDiscussion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid discussion ID",
    });
    return;
  }

  await deleteDiscussionService(
    id,
    req.userId
  );

  res.status(200).json({
    success: true,
    message: "Discussion deleted successfully",
  });
};

// ========================================
// ADD COMMENT
// ========================================

export const addComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid discussion ID",
    });
    return;
  }

  const validatedData =
    createCommentSchema.parse(req.body);

  const comment =
    await addCommentService(
      id,
      req.userId,
      validatedData.content
    );

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: {
      comment,
    },
  });
};

// ========================================
// DELETE COMMENT
// ========================================

export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const { commentId } = req.params;

  if (typeof commentId !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid comment ID",
    });
    return;
  }

  await deleteCommentService(
    commentId,
    req.userId
  );

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};

// ========================================
// LIKE / UNLIKE DISCUSSION
// ========================================

export const toggleDiscussionLike = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "User authentication required",
    });
    return;
  }

  const { id } = req.params;

  if (typeof id !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid discussion ID",
    });
    return;
  }

  const result =
    await toggleDiscussionLikeService(
      id,
      req.userId
    );

  res.status(200).json({
    success: true,
    message: result.liked
      ? "Discussion liked successfully"
      : "Discussion unliked successfully",
    data: result,
  });
};