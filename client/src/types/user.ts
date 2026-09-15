export type UserRole =
  | "STUDENT"
  | "RECRUITER"
  | "ADMIN";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
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
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}