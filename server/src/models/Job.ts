import mongoose, { Document, Schema } from "mongoose";

export type JobType = "FULL_TIME" | "PART_TIME" | "INTERNSHIP";

export type JobStatus = "OPEN" | "CLOSED";

export interface IJob extends Document {
  title: string;
  companyId: mongoose.Types.ObjectId;
  description: string;
  requirements: string[];
  skills: string[];
  location: string;
  jobType: JobType;
  salaryMin?: number;
  salaryMax?: number;
  applicationDeadline: Date;
  status: JobStatus;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    requirements: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    jobType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "INTERNSHIP"],
      required: true,
    },

    salaryMin: {
      type: Number,
      min: 0,
    },

    salaryMax: {
      type: Number,
      min: 0,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;