import {
  MapPin,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import type {
  Job,
} from "../../api/job.api";

interface JobCardProps {
  job: Job;
}

function JobCard({
  job,
}: JobCardProps) {
  const navigate = useNavigate();

  const company =
    typeof job.companyId === "object"
      ? job.companyId
      : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
            {company?.name
              ?.charAt(0)
              .toUpperCase() || "C"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-slate-900">
              {job.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {company?.name ||
                "Company"}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
          {job.status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-1.5">
          <MapPin size={16} />
          {job.location}
        </div>

        <div className="flex items-center gap-1.5">
          <Briefcase size={16} />
          {formatJobType(job.jobType)}
        </div>
      </div>

      {job.skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.skills
            .slice(0, 5)
            .map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div>
          {job.salaryMin ||
          job.salaryMax ? (
            <p className="text-sm font-semibold text-slate-900">
              {formatSalary(
                job.salaryMin
              )}{" "}
              -{" "}
              {formatSalary(
                job.salaryMax
              )}
            </p>
          ) : (
            <p className="text-sm text-slate-400">
              Salary not disclosed
            </p>
          )}
        </div>

        <button
          onClick={() =>
            navigate(
              `/student/jobs/${job._id}`
            )
          }
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          View Details
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function formatJobType(
  jobType: string
) {
  return jobType
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

function formatSalary(
  salary?: number
) {
  if (salary === undefined) {
    return "—";
  }

  return `₹${salary.toLocaleString(
    "en-IN"
  )}`;
}

export default JobCard;