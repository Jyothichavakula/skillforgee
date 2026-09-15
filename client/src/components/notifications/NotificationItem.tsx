import {
  Bell,
  Check,
  Trash2,
} from "lucide-react";

import type { Notification } from "../../api/notification.api";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem = ({
  notification,
  onRead,
  onDelete,
}: NotificationItemProps) => {
  return (
    <div
      className={`group relative rounded-2xl border p-6 transition duration-300 ${
        notification.isRead
          ? "border-neutral-800/50 bg-[#121215] hover:border-neutral-700"
          : "border-yellow-500/30 bg-neutral-900/80 shadow-[0_4px_20px_rgba(234,179,8,0.05)]"
      }`}
    >
      {!notification.isRead && (
        <div className="absolute -left-px top-1/2 h-12 -translate-y-1/2 w-1 rounded-r-full bg-yellow-500"></div>
      )}

      <div className="flex items-start gap-5">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition ${
          notification.isRead
            ? "bg-neutral-900 border-neutral-800 text-neutral-500"
            : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
        }`}>
          <Bell size={20} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className={`text-lg font-bold transition ${
                notification.isRead ? "text-white" : "text-yellow-400"
              }`}>
                {notification.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                {notification.message}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-neutral-800/60 pt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
              {new Date(
                notification.createdAt
              ).toLocaleString()}
            </p>

            <div className="flex items-center gap-3">
              {!notification.isRead && (
                <button
                  type="button"
                  onClick={() => onRead(notification._id)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-yellow-500 transition hover:bg-yellow-500/10"
                >
                  <Check size={14} />
                  Mark as read
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  onDelete(notification._id)
                }
                className="rounded-lg p-2 text-neutral-500 transition hover:bg-red-500/10 hover:text-red-500"
                title="Delete notification"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;