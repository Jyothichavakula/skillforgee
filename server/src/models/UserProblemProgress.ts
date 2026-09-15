import mongoose, { Document, Schema } from "mongoose";

export type ProblemProgressStatus =
  | "NOT_STARTED"
  | "ATTEMPTED"
  | "SOLVED";

export interface IUserProblemProgress extends Document {
  userId: mongoose.Types.ObjectId;
  problemId: mongoose.Types.ObjectId;
  status: ProblemProgressStatus;
  attempts: number;
  solvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userProblemProgressSchema =
  new Schema<IUserProblemProgress>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      problemId: {
        type: Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
      },

      status: {
        type: String,
        enum: [
          "NOT_STARTED",
          "ATTEMPTED",
          "SOLVED",
        ],
        default: "NOT_STARTED",
      },

      attempts: {
        type: Number,
        default: 0,
        min: 0,
      },

      solvedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

userProblemProgressSchema.index(
  {
    userId: 1,
    problemId: 1,
  },
  {
    unique: true,
  }
);

const UserProblemProgress =
  mongoose.model<IUserProblemProgress>(
    "UserProblemProgress",
    userProblemProgressSchema
  );

export default UserProblemProgress;