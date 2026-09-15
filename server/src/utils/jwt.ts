import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

const getAccessSecret = (): string => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }

  return secret;
};

const getRefreshSecret = (): string => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }

  return secret;
};

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    getAccessSecret(),
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    getRefreshSecret(),
    { expiresIn: "7d" }
  );
};

export const verifyAccessToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, getAccessSecret());

  if (
    typeof decoded === "string" ||
    typeof decoded.userId !== "string"
  ) {
    throw new Error("Invalid access token");
  }

  return {
    userId: decoded.userId,
  };
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, getRefreshSecret());

  if (
    typeof decoded === "string" ||
    typeof decoded.userId !== "string"
  ) {
    throw new Error("Invalid refresh token");
  }

  return {
    userId: decoded.userId,
  };
};