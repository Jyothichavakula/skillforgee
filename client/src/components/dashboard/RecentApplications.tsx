import {
  Briefcase,
  ArrowRight,
} from "lucide-react";

import type {
  Application,
} from "../../api/application.api";

interface RecentApplicationsProps {
  applications: Application[];
}

function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  const recentApplications =
    [...applications]
      .sort(
        (a, b) =>
          new Date(b.appliedAt).getTime() -
          new Date(a.appliedAt).getTime()
      )
      .slice(0, 5);

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Recent Applications
          </h2>

          <p className="mt-1 text-sm text-neutral-400">
            Your latest job applications.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
          <Briefcase size={20} />
        </div>
      </div>

      {recentApplications.length === 0 ? (
        <div className="py-10 text-center">
          <Briefcase
            size={32}
            className="mx-auto text-neutral-600"
          />

          <p className="mt-3 text-sm font-medium text-neutral-300">
            No applications yet
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Start applying to jobs to track your progress here.
          </p>
        </div>
      ) : (
        <div className="mt-5 divide-y divide-neutral-800/80">
          {recentApplications.map(
            (application) => {
              const job =
                typeof application.jobId ===
                "object"
                  ? application.jobId
                  : null;

              return (
                <div
                  key={application._id}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {job?.title ||
                        "Job Application"}
                    </p>

                    <p className="mt-1 text-xs text-neutral-400">
                      Applied{" "}
                      {formatDate(
                        application.appliedAt
                      )}
                    </p>
                  </div>

                  <StatusBadge
                    status={
                      application.status
                    }
                  />
                </div>
              );
            }
          )}
        </div>
      )}

      {recentApplications.length > 0 && (
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 py-2.5 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white">
          View all applications
          <ArrowRight size={16} className="text-yellow-400" />
        </button>
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<
    string,
    string
  > = {
    APPLIED:
      "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30",
    SHORTLISTED:
      "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    INTERVIEW:
      "bg-white/10 text-white border border-white/20",
    SELECTED:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    REJECTED:
      "bg-red-500/20 text-red-300 border border-red-500/30",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-neutral-800 text-neutral-400"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(
  date: string
) {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

export default RecentApplications;