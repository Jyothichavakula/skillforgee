import User from "../models/User.js";

interface UpdateProfileInput {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  university?: string;
  degree?: string;
  graduationYear?: number;
  skills?: string[];
}

export const getUserById = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserProfile = async (
  userId: string,
  data: UpdateProfileInput
) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};