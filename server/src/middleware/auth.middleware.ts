import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole?: "STUDENT" | "RECRUITER" | "ADMIN";
  file?: Express.Multer.File;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({
        success: false,
        message: "Authorization header is missing",
      });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
      return;
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access token is missing",
      });
      return;
    }

    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.userId).select(
      "_id role isActive"
    );

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({
        success: false,
        message: "Your account has been deactivated",
      });
      return;
    }

    req.userId = user._id.toString();
    req.userRole = user.role;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};