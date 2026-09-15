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
    <div className="group rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm transition duration-300 hover:border-yellow-500/30 hover:shadow-[0_4px_20px_rgba(234,179,8,0.05)]">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        {/* Job Information */}
        <div className="flex gap-4">
          {/* Company Logo */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-xl font-black text-white group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 group-hover:text-yellow-500 transition">
            {company?.name
              ?.charAt(0)
              .toUpperCase() || "C"}
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-white group-hover:text-yellow-400 transition">
              {job?.title || "Job"}
            </h2>

            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-neutral-500">
              {company?.name || "Company"}
            </p>

            <div className="mt-4 flex flex-wrap gap-5 text-sm font-medium text-neutral-400">
              {job?.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={15} className="text-neutral-500" />
                  {job.location}
                </span>
              )}

              {job?.jobType && (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={15} className="text-neutral-500" />
                  {job.jobType.replace("_", " ")}
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <Calendar size={15} className="text-neutral-500" />
                Applied {appliedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="shrink-0 pt-1">
          <ApplicationStatusBadge
            status={application.status}
          />
        </div>
      </div>

      {/* Cover Letter */}
      {application.coverLetter && (
        <div className="mt-6 border-t border-neutral-800/80 pt-5">
          <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
            Cover Letter Snippet
          </p>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-300">
            {application.coverLetter}
          </p>
        </div>
      )}
    </div>
  );
}

export default ApplicationCard;