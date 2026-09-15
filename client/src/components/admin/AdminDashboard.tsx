import {
  Activity,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileText,
  Loader2,
  Users,
} from "lucide-react";

import AdminStatCard from "../../components/admin/AdminStatCard";
import RecentUsers from "../../components/admin/RecentUsers";
import RecentJobs from "../../components/admin/RecentJobs";

import {
  useAdminDashboard,
} from "../../hooks/useAdminDashboard";


function AdminDashboard() {

  const {
    data,
    isLoading,
    isError,
  } = useAdminDashboard();


  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3 text-slate-600">

          <Loader2
            size={22}
            className="animate-spin"
          />

          <span>
            Loading admin dashboard...
          </span>

        </div>

      </div>
    );
  }


  if (isError || !data) {
    return (
      <div className="p-4 md:p-8">

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

          <h2 className="text-lg font-semibold text-red-800">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-red-600">
            Something went wrong while loading
            the admin dashboard.
          </p>

        </div>

      </div>
    );
  }


  const {
    users,
    companies,
    jobs,
    applications,
    problems,
  } = data.overview;


  return (
    <div className="space-y-8 p-4 md:p-8">

      {/* Header */}
      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor and manage the SkillForge platform.
        </p>

      </div>


      {/* Main Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <AdminStatCard
          title="Total Users"
          value={users.total}
          icon={Users}
          description={`${users.active} active users`}
        />

        <AdminStatCard
          title="Companies"
          value={companies.total}
          icon={Building2}
        />

        <AdminStatCard
          title="Total Jobs"
          value={jobs.total}
          icon={BriefcaseBusiness}
          description={`${jobs.open} currently open`}
        />

        <AdminStatCard
          title="Applications"
          value={applications.total}
          icon={FileText}
        />

      </div>


      {/* Secondary Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <AdminStatCard
          title="Students"
          value={users.students}
          icon={Users}
        />

        <AdminStatCard
          title="Recruiters"
          value={users.recruiters}
          icon={Users}
        />

        <AdminStatCard
          title="Coding Problems"
          value={problems.total}
          icon={Code2}
          description={`${problems.active} active problems`}
        />

        <AdminStatCard
          title="Selected"
          value={applications.selected}
          icon={Activity}
          description={`${applications.interviews} interviews`}
        />

      </div>


      {/* Application Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-slate-900">
          Application Overview
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Applied
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {applications.applied}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Shortlisted
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {applications.shortlisted}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Interviews
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {applications.interviews}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Selected
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {applications.selected}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              Rejected
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {applications.rejected}
            </p>
          </div>

        </div>

      </div>


      {/* Recent Data */}
      <div className="grid gap-6 xl:grid-cols-2">

        <RecentUsers
          users={data.recentUsers}
        />

        <RecentJobs
          jobs={data.recentJobs}
        />

      </div>

    </div>
  );
}

export default AdminDashboard;