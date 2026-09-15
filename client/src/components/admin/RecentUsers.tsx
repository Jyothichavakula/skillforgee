import {
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import type { AdminUser } from "../../api/admin.api";


interface RecentUsersProps {
  users: AdminUser[];
}


function RecentUsers({
  users,
}: RecentUsersProps) {

  const getRoleIcon = (
    role: AdminUser["role"]
  ) => {
    if (role === "ADMIN") {
      return <ShieldCheck size={17} />;
    }

    if (role === "RECRUITER") {
      return <UsersRound size={17} />;
    }

    return <UserRound size={17} />;
  };


  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 p-5">

        <h2 className="text-lg font-semibold text-slate-900">
          Recent Users
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest users registered on SkillForge
        </p>

      </div>


      <div className="divide-y divide-slate-100">

        {users.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            No users found.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between gap-4 p-5"
            >

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                  {user.firstName
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-slate-900">
                    {user.firstName}{" "}
                    {user.lastName}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user.email}
                  </p>

                </div>

              </div>


              <div className="flex shrink-0 items-center gap-2">

                <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
                  {getRoleIcon(user.role)}
                  {user.role}
                </span>

                <span
                  className={`hidden rounded-lg px-2.5 py-1.5 text-xs font-medium sm:block ${
                    user.isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {user.isActive
                    ? "Active"
                    : "Inactive"}
                </span>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default RecentUsers;