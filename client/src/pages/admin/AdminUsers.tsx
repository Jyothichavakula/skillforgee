import { useEffect, useState } from "react";
import {
  Loader2,
  Users,
} from "lucide-react";

import UserFilters from "../../components/admin/UserFilters";
import AdminUserCard from "../../components/admin/AdminUserCard";

import {
  useAdminUsers,
  useUpdateAdminUserStatus,
} from "../../hooks/useAdminUsers";

import type {
  AdminUserRole,
  AdminUserStatus,
} from "../../api/adminUser.api";

import { useAppSelector } from "../../hooks/redux";


function AdminUsers() {

  const currentAdmin =
    useAppSelector(
      (state) => state.auth.user
    );


  const [search, setSearch] =
    useState("");

  const [role, setRole] =
    useState<
      AdminUserRole | ""
    >("");

  const [status, setStatus] =
    useState<
      AdminUserStatus | ""
    >("");


  const updateMutation =
    useUpdateAdminUserStatus();


  // Small debounce for search
  const [debouncedSearch, setDebouncedSearch] =
    useState("");


  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDebouncedSearch(
          search.trim()
        );
      }, 400);

    return () =>
      clearTimeout(timer);
  }, [search]);


 const {
  data: filteredUsers = [],
  isLoading,
  isError,
} = useAdminUsers({
  search:
    debouncedSearch || undefined,

  role:
    role || undefined,

  status:
    status || undefined,
});


  const handleStatusChange = (
    userId: string,
    isActive: boolean
  ) => {
    updateMutation.mutate({
      userId,
      isActive,
    });
  };


  const handleClear = () => {
    setSearch("");
    setRole("");
    setStatus("");
  };


  return (
    <div className="space-y-6 p-4 md:p-8">

      {/* Header */}
      <div>

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Users size={21} />
          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              User Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage students, recruiters,
              and administrators.
            </p>

          </div>

        </div>

      </div>


      {/* Filters */}
      <UserFilters
        search={search}
        role={role}
        status={status}
        onSearchChange={
          setSearch
        }
        onRoleChange={
          setRole
        }
        onStatusChange={
          setStatus
        }
        onClear={handleClear}
      />


      {/* Error */}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

          <p className="text-sm font-medium text-red-700">
            Failed to load users.
          </p>

        </div>
      )}


      {/* Loading */}
      {isLoading && (
        <div className="flex min-h-[30vh] items-center justify-center">

          <div className="flex items-center gap-3 text-slate-600">

            <Loader2
              size={22}
              className="animate-spin"
            />

            <span>
              Loading users...
            </span>

          </div>

        </div>
      )}


      {/* Users */}
      {!isLoading &&
        !isError && (
          <>
            <div className="flex items-center justify-between">

              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredUsers.length}
                </span>{" "}
                users
              </p>

            </div>


            {filteredUsers.length ===
            0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

                <Users
                  size={32}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-semibold text-slate-700">
                  No users found
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Try changing your search
                  or filters.
                </p>

              </div>
            ) : (
              <div className="space-y-4">

                {filteredUsers.map(
                  (user) => (
                    <AdminUserCard
                      key={user._id}
                      user={user}
                      currentAdminId={
                        currentAdmin?._id
                      }
                      onStatusChange={
                        handleStatusChange
                      }
                      isUpdating={
                        updateMutation.isPending &&
                        updateMutation.variables
                          ?.userId ===
                          user._id
                      }
                    />
                  )
                )}

              </div>
            )}
          </>
        )}

    </div>
  );
}

export default AdminUsers;