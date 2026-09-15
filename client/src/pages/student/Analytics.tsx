import AnalyticsOverview from "../../components/analytics/AnalyticsOverview";
import CodingAnalytics from "../../components/analytics/CodingAnalytics";
import ApplicationAnalytics from "../../components/analytics/ApplicationAnalytics";
import ApplicationStatusChart from "../../components/analytics/ApplicationStatusChart";
import { useDashboard } from "../../hooks/useDashboard";
import { Loader2, TrendingUp } from "lucide-react";

const Analytics = () => {
  const { data, isLoading, isError, refetch } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-neutral-500">Performance Tracking</p>
          <h1 className="mt-1 text-3xl font-extrabold text-white">Analytics</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-[#121215] border border-neutral-800"
            />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-80 animate-pulse rounded-2xl bg-[#121215] border border-neutral-800"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-3xl mx-auto mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-10 text-center">
        <p className="text-sm font-bold text-red-500">
          Failed to load analytics. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="mt-6 rounded-xl bg-red-500 px-6 py-2.5 text-sm font-extrabold text-black transition hover:bg-red-400"
        >
          Retry
        </button>
      </div>
    );
  }

  const coding = data.coding;
  const applications = data.applications;
  const roadmapCompletion = data.roadmap?.completionPercentage ?? 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-yellow-500 mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Performance Tracking
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">Analytics</h1>

        <p className="mt-2 text-lg text-neutral-400">
          Track your coding progress, applications, and overall placement preparation.
        </p>
      </div>

      {/* Analytics Overview */}
      <AnalyticsOverview
        totalApplications={applications.total}
        totalProblems={coding.totalSolved + coding.totalAttempted}
        solvedProblems={coding.totalSolved}
        overallProgress={roadmapCompletion}
      />

      {/* Main Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CodingAnalytics
          totalProblems={coding.totalSolved + coding.totalAttempted}
          solvedProblems={coding.totalSolved}
          attemptedProblems={coding.totalAttempted}
        />

        <ApplicationAnalytics
          totalApplications={applications.total}
          shortlisted={applications.shortlisted}
          interviews={applications.interviews}
          selected={applications.selected}
          rejected={applications.rejected}
        />
      </div>

      {/* Application Status */}
      <ApplicationStatusChart
        applied={applications.applied}
        shortlisted={applications.shortlisted}
        interview={applications.interviews}
        selected={applications.selected}
        rejected={applications.rejected}
      />
    </div>
  );
};

export default Analytics;