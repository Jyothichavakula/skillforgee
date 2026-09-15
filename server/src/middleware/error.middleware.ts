import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  if (error instanceof Error) {
    const isDevelopment =
      process.env.NODE_ENV !== "production";

    res.status(500).json({
      success: false,
      message: isDevelopment
        ? error.message
        : "Internal server error",
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};