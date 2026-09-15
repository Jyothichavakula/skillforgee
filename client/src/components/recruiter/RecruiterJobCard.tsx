import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { RecruiterJob } from "../../api/recruiterJob.api";

interface RecruiterJobCardProps {
  job: RecruiterJob;
  applicants?: number;
  onDelete: (jobId: string) => void;
  isDeleting: boolean;
}

function RecruiterJobCard({
  job,
  applicants = 0,
  onDelete,
  isDeleting,
}: RecruiterJobCardProps) {
  const company =
    typeof job.companyId === "object"
      ? job.companyId
      : undefined;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        {/* Job information */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">
              {job.title}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                job.status === "OPEN"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {job.status}
            </span>
          </div>

          {company?.name && (
            <p className="mt-1 text-sm text-slate-500">
              {company.name}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">

          {/* Applicants */}
          <Link
            to={`/recruiter/jobs/${job._id}/applicants`}
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100"
            title="View applicants"
          >
            <Users size={16} />
            Applicants
          </Link>

          {/* Edit */}
          <Link
            to={`/recruiter/jobs/${job._id}/edit`}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-indigo-600"
            title="Edit job"
          >
            <Pencil size={17} />
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(job._id)}
            disabled={isDeleting}
            className="rounded-xl border border-red-100 p-2.5 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            title="Delete job"
          >
            <Trash2 size={17} />
          </button>

        </div>
      </div>

      {/* Job information */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>

        {/* Applicants */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users size={16} />
          <span>
            {applicants} applicants
          </span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          <span>
            {new Date(
              job.applicationDeadline
            ).toLocaleDateString()}
          </span>
        </div>

      </div>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}

export default RecruiterJobCard;