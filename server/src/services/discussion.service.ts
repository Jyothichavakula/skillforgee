import Discussion from "../models/Discussion.js";
import Comment from "../models/Comment.js";
interface CreateDiscussionInput {
  authorId: string;
  title: string;
  content: string;
  category?:
    | "GENERAL"
    | "PLACEMENTS"
    | "CODING"
    | "CAREER"
    | "RESUME"
    | "INTERVIEWS";
  tags?: string[];
}

interface UpdateDiscussionInput {
  title?: string;
  content?: string;
  category?:
    | "GENERAL"
    | "PLACEMENTS"
    | "CODING"
    | "CAREER"
    | "RESUME"
    | "INTERVIEWS";
  tags?: string[];
}

// ========================================
// CREATE DISCUSSION
// ========================================

export const createDiscussion = async (
  data: CreateDiscussionInput
) => {
  const discussion = await Discussion.create({
    authorId: data.authorId,
    title: data.title,
    content: data.content,
    category: data.category ?? "GENERAL",
    tags: data.tags ?? [],
  });

  return Discussion.findById(discussion._id)
    .populate(
      "authorId",
      "firstName lastName avatar university"
    );
};

// ========================================
// GET ALL DISCUSSIONS
// ========================================
export const getDiscussions = async (
  category?: string
) => {
  const query = Discussion.find();

  query.where("isActive").equals(true);

  if (category) {
    query.where("category").equals(category);
  }

  return query
    .populate(
      "authorId",
      "firstName lastName avatar university"
    )
    .sort({
      createdAt: -1,
    });
};
// ========================================
// GET DISCUSSION BY ID
// ========================================

export const getDiscussionById = async (
  discussionId: string
) => {
  const discussion = await Discussion.findOne({
    _id: discussionId,
    isActive: true,
  }).populate(
    "authorId",
    "firstName lastName avatar university"
  );

  if (!discussion) {
    throw new Error("Discussion not found");
  }

  const comments = await Comment.find({
    discussionId,
    isActive: true,
  })
    .populate(
      "authorId",
      "firstName lastName avatar university"
    )
    .sort({
      createdAt: 1,
    });

  return {
    discussion,
    comments,
  };
};

// ========================================
// UPDATE DISCUSSION
// ========================================

export const updateDiscussion = async (
  discussionId: string,
  userId: string,
  data: UpdateDiscussionInput
) => {
  const discussion =
    await Discussion.findById(discussionId);

  if (!discussion) {
    throw new Error("Discussion not found");
  }

  if (
    discussion.authorId.toString() !== userId
  ) {
    throw new Error(
      "You do not have permission to update this discussion"
    );
  }

  Object.assign(discussion, data);

  await discussion.save();

  return Discussion.findById(discussionId).populate(
    "authorId",
    "firstName lastName avatar university"
  );
};

// ========================================
// DELETE DISCUSSION
// ========================================

export const deleteDiscussion = async (
  discussionId: string,
  userId: string
) => {
  const discussion =
    await Discussion.findById(discussionId);

  if (!discussion) {
    throw new Error("Discussion not found");
  }

  if (
    discussion.authorId.toString() !== userId
  ) {
    throw new Error(
      "You do not have permission to delete this discussion"
    );
  }

  discussion.isActive = false;

  await discussion.save();

  await Comment.updateMany(
    { discussionId },
    {
      $set: {
        isActive: false,
      },
    }
  );

  return discussion;
};

// ========================================
// ADD COMMENT
// ========================================

export const addComment = async (
  discussionId: string,
  userId: string,
  content: string
) => {
  const discussion =
    await Discussion.findOne({
      _id: discussionId,
      isActive: true,
    });

  if (!discussion) {
    throw new Error("Discussion not found");
  }

  const comment = await Comment.create({
    discussionId,
    authorId: userId,
    content,
  });

  discussion.commentsCount += 1;

  await discussion.save();

  return Comment.findById(comment._id).populate(
    "authorId",
    "firstName lastName avatar university"
  );
};

// ========================================
// DELETE COMMENT
// ========================================

export const deleteComment = async (
  commentId: string,
  userId: string
) => {
  const comment =
    await Comment.findById(commentId);

  if (!comment || !comment.isActive) {
    throw new Error("Comment not found");
  }

  if (
    comment.authorId.toString() !== userId
  ) {
    throw new Error(
      "You do not have permission to delete this comment"
    );
  }

  comment.isActive = false;

  await comment.save();

  await Discussion.findByIdAndUpdate(
    comment.discussionId,
    {
      $inc: {
        commentsCount: -1,
      },
    }
  );

  return comment;
};

// ========================================
// LIKE / UNLIKE DISCUSSION
// ========================================

export const toggleDiscussionLike = async (
  discussionId: string,
  userId: string
) => {
  const discussion =
    await Discussion.findOne({
      _id: discussionId,
      isActive: true,
    });

  if (!discussion) {
    throw new Error("Discussion not found");
  }

  const userObjectId =
    discussion.likes.find(
      (id) => id.toString() === userId
    );

  if (userObjectId) {
    discussion.likes =
      discussion.likes.filter(
        (id) => id.toString() !== userId
      );
  } else {
    discussion.likes.push(
      userId as any
    );
  }

  await discussion.save();

  return {
    liked: !userObjectId,
    likesCount: discussion.likes.length,
  };
};