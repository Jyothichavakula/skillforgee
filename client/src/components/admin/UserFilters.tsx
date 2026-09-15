import { Search, X } from "lucide-react";

import type {
  AdminUserRole,
  AdminUserStatus,
} from "../../api/adminUser.api";


interface UserFiltersProps {
  search: string;
  role: AdminUserRole | "";
  status: AdminUserStatus | "";

  onSearchChange: (
    value: string
  ) => void;

  onRoleChange: (
    value: AdminUserRole | ""
  ) => void;

  onStatusChange: (
    value: AdminUserStatus | ""
  ) => void;

  onClear: () => void;
}


function UserFilters({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onClear,
}: UserFiltersProps) {
  const hasFilters =
    search ||
    role ||
    status;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">

        {/* Search */}
        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            placeholder="Search by name or email..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>


        {/* Role */}
        <select
          value={role}
          onChange={(event) =>
            onRoleChange(
              event.target.value as
                | AdminUserRole
                | ""
            )
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
        >
          <option value="">
            All Roles
          </option>

          <option value="STUDENT">
            Students
          </option>

          <option value="RECRUITER">
            Recruiters
          </option>

          <option value="ADMIN">
            Admins
          </option>
        </select>


        {/* Status */}
        <select
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value as
                | AdminUserStatus
                | ""
            )
          }
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
        >
          <option value="">
            All Status
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>
        </select>


        {/* Clear */}
        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <X size={16} />
            Clear
          </button>
        )}

      </div>

    </div>
  );
}

export default UserFilters;