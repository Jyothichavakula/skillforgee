import mongoose, { Document, Schema } from "mongoose";

export interface IResumeAnalysis extends Document {
  userId: mongoose.Types.ObjectId;

  fileName: string;
  fileType: "PDF" | "DOCX";

  resumeText: string;

  atsScore: number;

  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  suggestions: string[];

  analyzedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const resumeAnalysisSchema =
  new Schema<IResumeAnalysis>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      fileName: {
        type: String,
        required: true,
        trim: true,
      },

      fileType: {
        type: String,
        enum: ["PDF", "DOCX"],
        required: true,
      },

      resumeText: {
        type: String,
        required: true,
        maxlength: 30000,
      },

      atsScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      missingSkills: {
        type: [String],
        default: [],
      },

      suggestions: {
        type: [String],
        default: [],
      },

      analyzedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

resumeAnalysisSchema.index({
  userId: 1,
  createdAt: -1,
});

const ResumeAnalysis =
  mongoose.model<IResumeAnalysis>(
    "ResumeAnalysis",
    resumeAnalysisSchema
  );

export default ResumeAnalysis;