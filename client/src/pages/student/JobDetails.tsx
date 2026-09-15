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
      <div className="space-y-6 max-w-5xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
        <div className="h-8 w-32 animate-pulse rounded bg-neutral-800" />
        <div className="h-72 animate-pulse rounded-2xl bg-[#121215] shadow-sm" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#121215] shadow-sm" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="max-w-2xl mx-auto mt-10 rounded-2xl border border-red-500/20 bg-[#121215] p-10 text-center">
        <h2 className="text-xl font-bold text-white">
          Unable to load job
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
          This job may no longer exist or could not be loaded.
        </p>

        <button
          onClick={() => navigate("/student/jobs")}
          className="mt-6 rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-extrabold text-black transition hover:bg-yellow-400"
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
    <div className="space-y-6 max-w-5xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Back */}
      <button
        onClick={() => navigate("/student/jobs")}
        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-yellow-400 transition"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </button>

      {/* Main Job Header */}
      <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between relative z-10">
          <div className="flex gap-5">
            {/* Company Logo / Initial */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 text-3xl font-black text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              {company?.name?.charAt(0).toUpperCase() || "C"}
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-neutral-500">
                {company?.name || "Company"}
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
                {job.title}
              </h1>

              <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium text-neutral-300">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} className="text-neutral-500" />
                  {job.location}
                </span>

                <span className="inline-flex items-center gap-2">
                  <Briefcase size={16} className="text-neutral-500" />
                  {formatJobType(job.jobType)}
                </span>

                <span className="inline-flex items-center gap-2">
                  <IndianRupee size={16} className="text-neutral-500" />
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
            className="shrink-0 rounded-xl bg-yellow-500 px-8 py-3.5 text-sm font-extrabold text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] transition hover:bg-yellow-400 hover:scale-105"
          >
            Apply Now
          </button>
        </div>
      </section>

      {/* Job Information */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Description */}
        <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-3">
            Job Description
          </h2>

          <div className="mt-5 whitespace-pre-line text-sm leading-7 text-neutral-300 prose prose-invert max-w-none">
            {job.description}
          </div>
        </section>

        {/* Overview */}
        <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-3">
            Job Overview
          </h2>

          <div className="mt-5 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                Location
              </p>

              <p className="mt-1.5 text-sm font-bold text-white">
                {job.location}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                Job Type
              </p>

              <p className="mt-1.5 text-sm font-bold text-white">
                {formatJobType(job.jobType)}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                Salary
              </p>

              <p className="mt-1.5 text-sm font-bold text-white">
                {formatSalary()}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                Application Deadline
              </p>

              <p className="mt-1.5 flex items-center gap-2 text-sm font-bold text-white">
                <Calendar size={16} className="text-yellow-500" />
                {formatDeadline()}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Skills */}
      <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
        <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-3">
          Required Skills
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">
          {job.skills.length > 0 ? (
            job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-2 text-sm font-bold text-neutral-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-neutral-500">
              No specific skills listed.
            </p>
          )}
        </div>
      </section>

      {/* Requirements */}
      <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
        <h2 className="text-xl font-bold text-white border-b border-neutral-800 pb-3">
          Requirements
        </h2>

        {job.requirements.length > 0 ? (
          <ul className="mt-5 space-y-4">
            {job.requirements.map(
              (requirement, index) => (
                <li
                  key={index}
                  className="flex gap-4 text-sm leading-6 text-neutral-300"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
                  <span>{requirement}</span>
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-neutral-500">
            No specific requirements listed.
          </p>
        )}
      </section>
    </div>
  );
}

export default JobDetails;