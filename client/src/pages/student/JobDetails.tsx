import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, Calendar, IndianRupee } from "lucide-react";

import { useJob } from "../../hooks/useJobs";

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: job,
    isLoading,
    isError,
  } = useJob(id || "");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />

        <div className="h-72 animate-pulse rounded-2xl bg-white shadow-sm" />

        <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Unable to load job
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          This job may no longer exist or could not be loaded.
        </p>

        <button
          onClick={() => navigate("/student/jobs")}
          className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const company =
    typeof job.companyId === "string"
      ? null
      : job.companyId;

  const formatJobType = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "Full Time";
      case "PART_TIME":
        return "Part Time";
      case "INTERNSHIP":
        return "Internship";
      default:
        return type;
    }
  };

  const formatSalary = () => {
    if (
      job.salaryMin == null &&
      job.salaryMax == null
    ) {
      return "Salary not disclosed";
    }

    if (
      job.salaryMin != null &&
      job.salaryMax != null
    ) {
      return `₹${job.salaryMin.toLocaleString()} - ₹${job.salaryMax.toLocaleString()}`;
    }

    if (job.salaryMin != null) {
      return `From ₹${job.salaryMin.toLocaleString()}`;
    }

    return `Up to ₹${job.salaryMax?.toLocaleString()}`;
  };

  const formatDeadline = () => {
    if (!job.applicationDeadline) {
      return "No deadline specified";
    }

    return new Date(
      job.applicationDeadline
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/student/jobs")}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </button>

      {/* Main Job Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex gap-4">
            {/* Company Logo / Initial */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-600">
              {company?.name?.charAt(0).toUpperCase() || "C"}
            </div>

            <div>
              <p className="text-sm font-medium text-indigo-600">
                {company?.name || "Company"}
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {job.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={16} />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={16} />
                  {formatJobType(job.jobType)}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <IndianRupee size={16} />
                  {formatSalary()}
                </span>
              </div>
            </div>
          </div>

          {/* Apply */}
          <button
            onClick={() =>
              navigate(
                `/student/jobs/${job._id}/apply`
              )
            }
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Job Information */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Description */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900">
            Job Description
          </h2>

          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
            {job.description}
          </div>
        </section>

        {/* Overview */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Job Overview
          </h2>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {job.location}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Job Type
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {formatJobType(job.jobType)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Salary
              </p>

              <p className="mt-1 text-sm font-medium text-slate-700">
                {formatSalary()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Application Deadline
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Calendar size={16} />
                {formatDeadline()}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Skills */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Required Skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.length > 0 ? (
            job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No specific skills listed.
            </p>
          )}
        </div>
      </section>

      {/* Requirements */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Requirements
        </h2>

        {job.requirements.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {job.requirements.map(
              (requirement, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                  {requirement}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-slate-500">
            No specific requirements listed.
          </p>
        )}
      </section>
    </div>
  );
}

export default JobDetails;