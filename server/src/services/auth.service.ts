import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
verifyRefreshToken,

} from "../utils/jwt.js";
import RefreshToken from "../models/RefreshToken.js";
import { hashToken } from "../utils/token.js";


interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}
export const refreshAccessToken = async (
  refreshToken: string
) => {
  const payload = verifyRefreshToken(refreshToken);

  const oldTokenHash = hashToken(refreshToken);

  const storedToken = await RefreshToken.findOne({
    tokenHash: oldTokenHash,
    userId: payload.userId,
  });

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  // Detect reuse of an already rotated/revoked token
  if (storedToken.revokedAt) {
    throw new Error("Refresh token reuse detected");
  }

  if (storedToken.expiresAt < new Date()) {
    throw new Error("Refresh token has expired");
  }

  const user = await User.findById(payload.userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isActive) {
    throw new Error("Your account has been deactivated");
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken(
    user._id.toString()
  );

  const newRefreshToken = generateRefreshToken(
    user._id.toString()
  );

  const newRefreshTokenHash = hashToken(
    newRefreshToken
  );

  // Revoke old refresh token
  storedToken.revokedAt = new Date();

  // Link old token → new token
  storedToken.replacedByTokenHash =
    newRefreshTokenHash;

  await storedToken.save();

  // Store new refresh token
  await RefreshToken.create({
    tokenHash: newRefreshTokenHash,
    userId: user._id,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};


export const registerUser = async (data: RegisterInput) => {
  const { firstName, lastName, email, password } = data;

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
};

export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await User.findOne({
    email: email.toLowerCase(),
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    throw new Error("Your account has been deactivated");
  }

  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  const refreshTokenHash = hashToken(refreshToken);

  

await RefreshToken.create({
  tokenHash: refreshTokenHash,
  userId: user._id,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});



 return {
  user: {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    university: user.university,
    degree: user.degree,
    skills: user.skills,
    lastLoginAt: user.lastLoginAt,
  },
  
  accessToken,
  refreshToken,
};
};
export const logoutUser = async (
  refreshToken: string
): Promise<void> => {
  const tokenHash = hashToken(refreshToken);

  await RefreshToken.findOneAndUpdate(
    { tokenHash },
    {
      revokedAt: new Date(),
    }
  );
};