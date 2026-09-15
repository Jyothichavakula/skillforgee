import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware.js";

type UserRole = "STUDENT" | "RECRUITER" | "ADMIN";

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.userRole) {
      res.status(401).json({
        success: false,
        message: "User authentication required",
      });
      return;
    }

    if (!allowedRoles.includes(req.userRole)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
      return;
    }

    next();
  };
};