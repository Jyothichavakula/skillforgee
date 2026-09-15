import mongoose, {
  Document,
  Schema,
} from "mongoose";

export type NotificationType =
  | "APPLICATION_STATUS"
  | "ROADMAP"
  | "CODING"
  | "RESUME"
  | "SYSTEM";

export interface INotification
  extends Document {
  userId: mongoose.Types.ObjectId;

  type: NotificationType;

  title: string;

  message: string;

  relatedId?: mongoose.Types.ObjectId;

  isRead: boolean;

  createdAt: Date;

  updatedAt: Date;
}

const notificationSchema =
  new Schema<INotification>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      type: {
        type: String,
        enum: [
          "APPLICATION_STATUS",
          "ROADMAP",
          "CODING",
          "RESUME",
          "SYSTEM",
        ],
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },

      message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
      },

      relatedId: {
        type: Schema.Types.ObjectId,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

notificationSchema.index({
  userId: 1,
  isRead: 1,
  createdAt: -1,
});

notificationSchema.index({
  userId: 1,
  createdAt: -1,
});

const Notification =
  mongoose.model<INotification>(
    "Notification",
    notificationSchema
  );

export default Notification;