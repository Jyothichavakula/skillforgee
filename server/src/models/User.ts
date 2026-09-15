import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "STUDENT" | "RECRUITER" | "ADMIN";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;

  avatar?: string;
  bio?: string;
  location?: string;
  university?: string;
  degree?: string;
  graduationYear?: number;

  skills: string[];

  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["STUDENT", "RECRUITER", "ADMIN"],
      default: "STUDENT",
    },

    avatar: {
      type: String,
    },

    bio: {
      type: String,
      maxlength: 500,
    },

    location: {
      type: String,
    },

    university: {
      type: String,
    },

    degree: {
      type: String,
    },

    graduationYear: {
      type: Number,
    },

    skills: {
      type: [String],
      default: [],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;