import {
  Briefcase,
  Calendar,
  MapPin,
} from "lucide-react";

import type {
  Application,
} from "../../api/application.api";

import ApplicationStatusBadge from "./ApplicationStatusBadge";

interface ApplicationCardProps {
  application: Application;
}

function ApplicationCard({
  application,
}: ApplicationCardProps) {
  const job =
    typeof application.jobId === "string"
      ? null
      : application.jobId;

  const company =
    typeof job?.companyId === "string"
      ? null
      : job?.companyId;

  const appliedDate = new Date(
    application.appliedAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        {/* Job Information */}
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
            {company?.name
              ?.charAt(0)
              .toUpperCase() || "C"}
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {job?.title || "Job"}
            </h2>

            <p className="mt-1 text-sm font-medium text-indigo-600">
              {company?.name || "Company"}
            </p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
              {job?.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} />
                  {job.location}
                </span>
              )}

              {job?.jobType && (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={15} />
                  {job.jobType}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} />
                Applied {appliedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <ApplicationStatusBadge
          status={application.status}
        />
      </div>

      {/* Cover Letter */}
      {application.coverLetter && (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Cover Letter
          </p>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
            {application.coverLetter}
          </p>
        </div>
      )}
    </div>
  );
}

export default ApplicationCard;