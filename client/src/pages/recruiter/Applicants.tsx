import {
  ArrowLeft,
  BriefcaseBusiness,
  Loader2,
  Users,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { useState } from "react";

import {
  useRecruiterApplications,
} from "../../hooks/useRecruiterApplications";

import {
  useRecruiterJob,
} from "../../hooks/useRecruiterJobs";

import type {
  RecruiterApplicationStatus,
} from "../../api/recruiterApplication.api";

import ApplicantCard from "../../components/recruiter/ApplicantCard";
import ApplicantFilters from "../../components/recruiter/ApplicantFilters";

function Applicants() {
  const { id } =
    useParams<{ id: string }>();

  const [status, setStatus] =
    useState<
      RecruiterApplicationStatus | "ALL"
    >("ALL");

  const {
    data: job,
    isLoading: jobLoading,
  } = useRecruiterJob(id || "");

  const {
    data: applications = [],
    isLoading: applicationsLoading,
    isError,
  } = useRecruiterApplications(
    id || ""
  );

  const filteredApplications =
    status === "ALL"
      ? applications
      : applications.filter(
          (application) =>
            application.status === status
        );

  if (jobLoading || applicationsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2
            size={22}
            className="animate-spin"
          />
          <span>
            Loading applicants...
          </span>
        </div>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="p-6 md:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Unable to load applicants
          </h2>

          <p className="mt-2 text-sm text-red-600">
            The job or applicant information
            could not be loaded.
          </p>

          <Link
            to="/recruiter/jobs"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            <ArrowLeft size={16} />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8">

      {/* Header */}
      <div>
        <Link
          to="/recruiter/jobs"
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Users size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Applicants
              </h1>

              <p className="text-sm text-slate-500">
                {job.title}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            <BriefcaseBusiness size={16} />
            {applications.length}{" "}
            Applicants
          </div>

        </div>
      </div>

      {/* Filters */}
      <ApplicantFilters
        status={status}
        onStatusChange={setStatus}
      />

      {/* Applicant list */}
      {filteredApplications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Users
            size={36}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-3 font-semibold text-slate-900">
            No applicants found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            There are no applicants matching
            this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map(
            (application) => (
              <ApplicantCard
                key={application._id}
                application={application}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Applicants;