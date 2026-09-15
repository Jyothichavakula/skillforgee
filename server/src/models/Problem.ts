import mongoose, { Document, Schema } from "mongoose";

export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface IProblem extends Document {
  title: string;
  difficulty: ProblemDifficulty;
  topics: string[];
  companyTags: string[];
  leetcodeUrl: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const problemSchema = new Schema<IProblem>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },

    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },

    topics: {
      type: [String],
      default: [],
    },

    companyTags: {
      type: [String],
      default: [],
    },

    leetcodeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      maxlength: 1000,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

problemSchema.index({ difficulty: 1 });
problemSchema.index({ topics: 1 });
problemSchema.index({ companyTags: 1 });

const Problem = mongoose.model<IProblem>("Problem", problemSchema);

export default Problem;