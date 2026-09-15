import { Router } from "express";

import {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  updateDiscussion,
  deleteDiscussion,
  addComment,
  deleteComment,
  toggleDiscussionLike,
} from "../controllers/discussion.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// ========================================
// DISCUSSIONS
// ========================================

router.post(
  "/",
  authenticate,
  createDiscussion
);

router.get(
  "/",
  authenticate,
  getDiscussions
);

router.get(
  "/:id",
  authenticate,
  getDiscussionById
);

router.patch(
  "/:id",
  authenticate,
  updateDiscussion
);

router.delete(
  "/:id",
  authenticate,
  deleteDiscussion
);

// ========================================
// COMMENTS
// ========================================

router.post(
  "/:id/comments",
  authenticate,
  addComment
);

router.delete(
  "/comments/:commentId",
  authenticate,
  deleteComment
);

// ========================================
// LIKES
// ========================================

router.post(
  "/:id/like",
  authenticate,
  toggleDiscussionLike
);

export default router;