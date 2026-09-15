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
    <div className="group rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm transition duration-300 hover:border-yellow-500/40 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(234,179,8,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-xl font-black text-white group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 group-hover:text-yellow-500 transition">
            {company?.name
              ?.charAt(0)
              .toUpperCase() || "C"}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-extrabold text-white group-hover:text-yellow-400 transition">
              {job.title}
            </h3>

            <p className="mt-1 text-sm font-bold uppercase tracking-wide text-neutral-500">
              {company?.name ||
                "Company"}
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs font-bold tracking-wide text-green-500">
          {job.status}
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-5 text-sm text-neutral-400 font-medium">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-neutral-500" />
          {job.location}
        </div>

        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-neutral-500" />
          {formatJobType(job.jobType)}
        </div>
      </div>

      {job.skills.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {job.skills
            .slice(0, 5)
            .map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-300"
              >
                {skill}
              </span>
            ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-neutral-800 pt-5">
        <div>
          {job.salaryMin ||
          job.salaryMax ? (
            <p className="text-sm font-extrabold text-white">
              {formatSalary(
                job.salaryMin
              )}{" "}
              -{" "}
              {formatSalary(
                job.salaryMax
              )}
            </p>
          ) : (
            <p className="text-sm font-medium text-neutral-500">
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
          className="flex items-center gap-2 rounded-xl bg-neutral-800 px-5 py-2.5 text-sm font-extrabold text-white transition hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]"
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