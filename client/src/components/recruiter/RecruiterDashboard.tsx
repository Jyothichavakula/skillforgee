import {
  BriefcaseBusiness,
  CheckCircle,
  Clock,
  FileText,
  Users,
  XCircle,
} from "lucide-react";

import { useRecruiterDashboard } from "../../hooks/useRecruiterDashboard";

import RecruiterStatCard from "../../components/recruiter/RecruiterStatCard";
import RecruiterJobTable from "../../components/recruiter/RecruiterJobTable";
import RecentApplicants from "../../components/recruiter/RecentApplicants";

function RecruiterDashboard() {
  const {
    data,
    isLoading,
    isError,
  } = useRecruiterDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading recruiter dashboard...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load recruiter dashboard
        </h2>

        <p className="mt-1 text-sm text-red-600">
          Please try again later.
        </p>
      </div>
    );
  }

  const { overview } = data;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Recruiter Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your jobs and track candidate applications.
        </p>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <RecruiterStatCard
          title="Total Jobs"
          value={overview.totalJobs}
          icon={BriefcaseBusiness}
          description="Jobs created by you"
        />

        <RecruiterStatCard
          title="Active Jobs"
          value={overview.activeJobs}
          icon={CheckCircle}
          description="Currently open"
        />

        <RecruiterStatCard
          title="Total Applicants"
          value={overview.totalApplicants}
          icon={Users}
          description="Applications received"
        />

        <RecruiterStatCard
          title="Interviews"
          value={overview.interviews}
          icon={Clock}
          description="Candidates in interview"
        />

      </div>

      {/* Application status */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

        <RecruiterStatCard
          title="Applied"
          value={overview.applied}
          icon={FileText}
        />

        <RecruiterStatCard
          title="Shortlisted"
          value={overview.shortlisted}
          icon={Users}
        />

        <RecruiterStatCard
          title="Interviews"
          value={overview.interviews}
          icon={Clock}
        />

        <RecruiterStatCard
          title="Selected"
          value={overview.selected}
          icon={CheckCircle}
        />

        <RecruiterStatCard
          title="Rejected"
          value={overview.rejected}
          icon={XCircle}
        />

      </div>

      {/* Jobs */}
      <RecruiterJobTable jobs={data.jobs} />

      {/* Recent Applicants */}
      <RecentApplicants
        applicants={data.recentApplicants}
      />

    </div>
  );
}

export default RecruiterDashboard;