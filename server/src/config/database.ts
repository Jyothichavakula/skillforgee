import mongoose from "mongoose";

const connectDatabase = async (): Promise<void> => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 0,
    maxIdleTimeMS: 60000,
  });

  console.log("MongoDB connected successfully");
};

export const connectDatabaseWithRetry = async (): Promise<void> => {
  const maxRetries = 5;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await connectDatabase();
      return;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempt}/${maxRetries} failed:`,
        error instanceof Error ? error.message : error
      );

      if (attempt === maxRetries) {
        throw new Error(
          "Unable to connect to MongoDB after multiple attempts."
        );
      }

      console.log("Retrying MongoDB connection in 5 seconds...");

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected successfully");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});