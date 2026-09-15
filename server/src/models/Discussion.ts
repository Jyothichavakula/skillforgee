import mongoose, { Document, Schema } from "mongoose";

export interface IDiscussion extends Document {
  authorId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  category:
    | "GENERAL"
    | "PLACEMENTS"
    | "CODING"
    | "CAREER"
    | "RESUME"
    | "INTERVIEWS";
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  commentsCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const discussionSchema = new Schema<IDiscussion>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },

    category: {
      type: String,
      enum: [
        "GENERAL",
        "PLACEMENTS",
        "CODING",
        "CAREER",
        "RESUME",
        "INTERVIEWS",
      ],
      default: "GENERAL",
    },

    tags: {
      type: [String],
      default: [],
    },

    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
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

discussionSchema.index({
  category: 1,
  createdAt: -1,
});

discussionSchema.index({
  authorId: 1,
  createdAt: -1,
});

const Discussion = mongoose.model<IDiscussion>(
  "Discussion",
  discussionSchema
);

export default Discussion;