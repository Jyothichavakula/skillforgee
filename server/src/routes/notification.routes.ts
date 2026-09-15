import { Router } from "express";

import {
  getMyNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
  deleteNotificationController,
} from "../controllers/notification.controller.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  getMyNotificationsController
);

router.patch(
  "/read-all",
  authenticate,
  markAllNotificationsAsReadController
);

router.patch(
  "/:id/read",
  authenticate,
  markNotificationAsReadController
);

router.delete(
  "/:id",
  authenticate,
  deleteNotificationController
);

export default router;