import {
  Briefcase,
  Code2,
  FileSearch,
  Map,
} from "lucide-react";

import { useAppSelector } from "../../hooks/redux";
import { useDashboard } from "../../hooks/useDashboard";

import StatCard from "../../components/dashboard/StatCard";
import ApplicationStatusCard from "../../components/dashboard/ApplicationStatusCard";
import CodingProgressCard from "../../components/dashboard/CodingProgressCard";
import RoadmapProgressCard from "../../components/dashboard/RoadmapProgressCard";
import ProgressChart from "../../components/dashboard/ProgressChart";


import { useApplications } from "../../hooks/useApplications";
import { useGamification } from "../../hooks/useGamification";
import { useProblems } from "../../hooks/useProblems";

import GamificationCard from "../../components/dashboard/GamificationCard";
import RecentApplications from "../../components/dashboard/RecentApplications";
import RecommendedProblems from "../../components/dashboard/RecommendedProblems";
import QuickActions from "../../components/dashboard/QuickActions";
function StudentDashboard() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useDashboard();

  const {
  data: applicationsData,
} = useApplications();

const {
  data: gamificationData,
} = useGamification();

const {
  data: problemsData,
} = useProblems();






  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

          <div className="mt-3 h-9 w-72 animate-pulse rounded bg-slate-200" />

          <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-500">
            !
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't retrieve your dashboard
            information.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const coding = data.coding;
  const applications =
    data.applications;
  const resume = data.resume;
  const roadmap = data.roadmap;

  const getNumber = (
    value: unknown
  ): number => {
    return typeof value === "number"
      ? value
      : 0;
  };

  const totalApplications =
    getNumber(applications?.total);

  const solvedProblems =
    getNumber(
      coding?.solvedProblems
    );

  const attemptedProblems =
    getNumber(
      coding?.attemptedProblems
    );

  const totalProblems =
    getNumber(
      coding?.totalProblems
    );

  const resumeScore =
    typeof resume?.atsScore === "number"
      ? resume.atsScore
      : null;

  const roadmapProgress =
    getNumber(
      roadmap?.progressPercentage
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-indigo-600">
          Student Workspace
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Your Career Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Track your placement preparation,
          coding progress, applications, and
          career growth in one place.
        </p>
      </section>

      {/* Welcome */}
      <section className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-indigo-300">
              Welcome back
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {user?.firstName}{" "}
              {user?.lastName} 👋
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Keep building your skills and
              preparing for your next
              opportunity.
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500 text-2xl font-bold">
            {user?.firstName
              ?.charAt(0)
              .toUpperCase() || "S"}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Applications"
            value={totalApplications}
            description="Total applications"
            icon={Briefcase}
          />

          <StatCard
            title="Problems Solved"
            value={solvedProblems}
            description="Coding problems"
            icon={Code2}
          />

          <StatCard
            title="Resume Score"
            value={
              resumeScore !== null
                ? `${resumeScore}/100`
                : "—"
            }
            description="Latest ATS score"
            icon={FileSearch}
          />

          <StatCard
            title="Roadmap Progress"
            value={`${roadmapProgress}%`}
            description="Learning progress"
            icon={Map}
          />
        </div>
      </section>

      {/* Applications */}
      <ApplicationStatusCard
        applied={getNumber(
          applications?.applied
        )}
        shortlisted={getNumber(
          applications?.shortlisted
        )}
        interviews={getNumber(
          applications?.interviews
        )}
        selected={getNumber(
          applications?.selected
        )}
        rejected={getNumber(
          applications?.rejected
        )}
      />

      {/* Progress Cards */}
      <section className="grid gap-6 lg:grid-cols-2">
        <CodingProgressCard
          solved={solvedProblems}
          attempted={attemptedProblems}
          total={totalProblems}
        />

        <RoadmapProgressCard
          progress={roadmapProgress}
          totalTopics={getNumber(
            roadmap?.totalTopics
          )}
          completedTopics={getNumber(
            roadmap?.completedTopics
          )}
        />
      </section>

      {/* Chart */}
      <ProgressChart
        solved={solvedProblems}
        attempted={attemptedProblems}
        total={totalProblems}
      />

     {/* Gamification */}
<GamificationCard
  xp={gamificationData?.xp ?? 0}
  level={gamificationData?.level ?? 1}
  problemsSolved={
    gamificationData?.problemsSolved ?? 0
  }
  achievements={
    gamificationData?.achievements?.length ?? 0
  }
/>

<section className="grid gap-6 xl:grid-cols-2">
  <RecentApplications
    applications={
      applicationsData ?? []
    }
  />

  <RecommendedProblems
    problems={
      problemsData?.problems ?? []
    }
  />
</section>


{/* Applications + Problems */}
<section className="grid gap-6 xl:grid-cols-2">
  <RecentApplications
    applications={
      applicationsData ?? []
    }
  />

  <RecommendedProblems
    problems={
      problemsData?.problems ?? []
    }
  />
</section>

{/* Quick Actions */}
<QuickActions />
    </div>
  );
}

export default StudentDashboard;