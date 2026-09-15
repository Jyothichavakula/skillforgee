import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  discussionId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  content: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    discussionId: {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 2000,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.index({
  discussionId: 1,
  createdAt: 1,
});

commentSchema.index({
  authorId: 1,
  createdAt: -1,
});

const Comment = mongoose.model<IComment>(
  "Comment",
  commentSchema
);

export default Comment;