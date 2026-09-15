import mongoose, {
  Document,
  Schema,
} from "mongoose";

export type AchievementCode =
  | "FIRST_SOLVE"
  | "TEN_SOLVES"
  | "TWENTY_FIVE_SOLVES"
  | "FIFTY_SOLVES"
  | "HUNDRED_SOLVES";

export interface IAchievement {
  code: AchievementCode;
  unlockedAt: Date;
}

export interface IUserGamification
  extends Document {
  userId: mongoose.Types.ObjectId;

  xp: number;

  level: number;

  problemsSolved: number;

  achievements: IAchievement[];

  createdAt: Date;

  updatedAt: Date;
}

const achievementSchema =
  new Schema<IAchievement>(
    {
      code: {
        type: String,
        enum: [
          "FIRST_SOLVE",
          "TEN_SOLVES",
          "TWENTY_FIVE_SOLVES",
          "FIFTY_SOLVES",
          "HUNDRED_SOLVES",
        ],
        required: true,
      },

      unlockedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      _id: false,
    }
  );

const userGamificationSchema =
  new Schema<IUserGamification>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      xp: {
        type: Number,
        default: 0,
        min: 0,
      },

      level: {
        type: Number,
        default: 1,
        min: 1,
      },

      problemsSolved: {
        type: Number,
        default: 0,
        min: 0,
      },

      achievements: {
        type: [achievementSchema],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

userGamificationSchema.index({
  xp: -1,
});

const UserGamification =
  mongoose.model<IUserGamification>(
    "UserGamification",
    userGamificationSchema
  );

export default UserGamification;