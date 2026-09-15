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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Applications
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest job applications.
          </p>
        </div>

        <Briefcase
          size={21}
          className="text-indigo-600"
        />
      </div>

      {recentApplications.length === 0 ? (
        <div className="py-10 text-center">
          <Briefcase
            size={32}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-sm font-medium text-slate-600">
            No applications yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Start applying to jobs to track
            your progress here.
          </p>
        </div>
      ) : (
        <div className="mt-5 divide-y divide-slate-100">
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
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {job?.title ||
                        "Job Application"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
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
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
          View all applications
          <ArrowRight size={16} />
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
      "bg-blue-50 text-blue-600",
    SHORTLISTED:
      "bg-indigo-50 text-indigo-600",
    INTERVIEW:
      "bg-purple-50 text-purple-600",
    SELECTED:
      "bg-green-50 text-green-600",
    REJECTED:
      "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
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