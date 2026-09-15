import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { apiRateLimiter } from "./middleware/rate-limit.middleware.js";

import companyRoutes from "./routes/company.routes.js";

import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

import problemRoutes from "./routes/problem.routes.js";
import problemProgressRoutes from "./routes/problemProgress.routes.js";
import problemRecommendationRoutes from "./routes/problemRecommendation.routes.js";

import roadmapRoutes from "./routes/roadmap.routes.js";

import careerCoachRoutes from "./routes/careerCoach.routes.js";

import resumeAnalyzerRoutes from "./routes/resumeAnalyzer.routes.js";

import analyticsRoutes from "./routes/analytics.routes.js";

import notificationRoutes from "./routes/notification.routes.js";

import gamificationRoutes from "./routes/gamification.routes.js";

import recruiterRoutes from "./routes/recruiter.routes.js";


import adminRoutes from "./routes/admin.routes.js";

import discussionRoutes from "./routes/discussion.routes.js";

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      const allowedOrigins = (
        process.env.CLIENT_URL || "http://localhost:5173,http://localhost:5174"
      ).split(",").map((o) => o.trim());

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);
app.use(cookieParser());

app.use(apiRateLimiter);
// Root route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SkillForge API",
  });
});

// Health check route
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "SkillForge API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/problem-progress", problemProgressRoutes);
app.use("/api/v1/roadmap", roadmapRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/discussions", discussionRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/gamification", gamificationRoutes);
app.use("/api/v1/recruiter", recruiterRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/career-coach", careerCoachRoutes);
app.use("/api/v1/resume", resumeAnalyzerRoutes);
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



app.use(errorHandler);

export default app;