import {
  GraduationCap,
  Mail,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import type {
  AdminUser,
} from "../../api/adminUser.api";

import UserStatusBadge from "./UserStatusBadge";


interface AdminUserCardProps {
  user: AdminUser;

  onStatusChange: (
    userId: string,
    isActive: boolean
  ) => void;

  isUpdating: boolean;

  currentAdminId?: string;
}


function AdminUserCard({
  user,
  onStatusChange,
  isUpdating,
  currentAdminId,
}: AdminUserCardProps) {

  const getRoleIcon = () => {
    if (user.role === "ADMIN") {
      return <ShieldCheck size={16} />;
    }

    if (user.role === "RECRUITER") {
      return <UsersRound size={16} />;
    }

    return <UserRound size={16} />;
  };


  const isCurrentAdmin =
    user._id === currentAdminId;


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        {/* User */}
        <div className="flex min-w-0 items-center gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
            {user.firstName
              ?.charAt(0)
              .toUpperCase()}
          </div>


          <div className="min-w-0">

            <h3 className="truncate font-semibold text-slate-900">
              {user.firstName}{" "}
              {user.lastName}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <Mail size={14} />
              <span className="truncate">
                {user.email}
              </span>
            </div>

          </div>

        </div>


        {/* Role + Status */}
        <div className="flex flex-wrap items-center gap-2">

          <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
            {getRoleIcon()}
            {user.role}
          </span>

          <UserStatusBadge
            isActive={
              user.isActive
            }
          />

        </div>

      </div>


      {/* Details */}
      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">

        {user.university && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <GraduationCap
              size={16}
              className="text-slate-400"
            />

            <span className="truncate">
              {user.university}
            </span>
          </div>
        )}

        {user.degree && (
          <div className="text-sm text-slate-500">
            <span className="text-xs text-slate-400">
              Degree
            </span>

            <p className="font-medium text-slate-700">
              {user.degree}
            </p>
          </div>
        )}

        <div className="text-sm text-slate-500">
          <span className="text-xs text-slate-400">
            Joined
          </span>

          <p className="font-medium text-slate-700">
            {new Date(
              user.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

      </div>


      {/* Action */}
      <div className="mt-5 flex justify-end border-t border-slate-100 pt-5">

        {isCurrentAdmin ? (
          <span className="text-xs text-slate-400">
            Current administrator
          </span>
        ) : (
          <button
            type="button"
            disabled={isUpdating}
            onClick={() =>
              onStatusChange(
                user._id,
                !user.isActive
              )
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
              user.isActive
                ? "border border-red-200 text-red-600 hover:bg-red-50"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {isUpdating
              ? "Updating..."
              : user.isActive
                ? "Deactivate"
                : "Activate"}
          </button>
        )}

      </div>

    </div>
  );
}

export default AdminUserCard;