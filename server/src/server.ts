import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDatabaseWithRetry } from "./config/database.js";

const PORT = Number(process.env.PORT) || 5000;

const requiredEnvironmentVariables = [
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "GEMINI_API_KEY",
];

const validateEnvironment = (): void => {
  const missingVariables =
    requiredEnvironmentVariables.filter(
      (variable) => !process.env[variable]
    );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingVariables.join(", ")}`
    );
  }
};

const startServer = async (): Promise<void> => {
  try {
    validateEnvironment();

    await connectDatabaseWithRetry();

    app.listen(PORT, () => {
      console.log(
        `SkillForge server running on port ${PORT}`
      );
  });
  } catch (error) {
    console.error(
      "Failed to start SkillForge server:",
      error
    );

    process.exit(1);
  }
};

startServer();