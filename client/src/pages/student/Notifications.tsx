import NotificationItem from "../../components/notifications/NotificationItem";
import { Bell } from "lucide-react";

import {
  useDeleteNotification,
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from "../../hooks/useNotifications";

const Notifications = () => {
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useNotifications();

  const markReadMutation =
    useMarkNotificationAsRead();

  const markAllMutation =
    useMarkAllNotificationsAsRead();

  const deleteMutation =
    useDeleteNotification();

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
        <div className="h-16 animate-pulse rounded-2xl bg-[#121215]" />
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#121215]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto mt-10 rounded-2xl border border-red-500/20 bg-[#121215] p-10 text-center">
        <p className="text-sm font-bold text-red-500">
          Failed to load notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-neutral-800 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-500 mb-2">
            <Bell className="h-4 w-4" />
            Stay Updated
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Notifications
          </h1>

          <p className="mt-2 text-lg text-neutral-400">
            Keep track of important updates from SkillForge.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={() =>
              markAllMutation.mutate()
            }
            disabled={markAllMutation.isPending}
            className="rounded-xl bg-neutral-800 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {markAllMutation.isPending
              ? "Updating..."
              : "Mark all as read"}
          </button>
        )}
      </div>

      {/* Unread count */}
      {unreadCount > 0 && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-6 py-4 shadow-[0_0_15px_rgba(234,179,8,0.05)]">
          <p className="text-sm font-bold text-neutral-300">
            You have{" "}
            <span className="text-yellow-400 font-extrabold">
              {unreadCount}
            </span>{" "}
            unread notification{unreadCount !== 1 ? "s" : ""}.
          </p>
        </div>
      )}

      {/* Notifications */}
      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500">
            <Bell className="h-8 w-8" />
          </div>
          <p className="text-xl font-bold text-white">
            No notifications yet.
          </p>

          <p className="mt-2 text-sm text-neutral-400">
            Important updates will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onRead={(id) =>
                markReadMutation.mutate(id)
              }
              onDelete={(id) =>
                deleteMutation.mutate(id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;