import { useState } from "react";

import type {
  JobType,
} from "../../api/job.api";

import { useJobs } from "../../hooks/useJobs";

import JobCard from "../../components/jobs/JobCard";
import JobFilters from "../../components/jobs/JobFilters";

function Jobs() {
  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [jobType, setJobType] =
    useState<JobType | "">("");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useJobs({
    search: search || undefined,
    location:
      location || undefined,
    jobType:
      jobType || undefined,
    status: "OPEN",
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-indigo-600">
          Opportunities
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Find Your Next Opportunity
        </h1>

        <p className="mt-2 text-slate-500">
          Discover jobs and internships that
          match your skills and career goals.
        </p>
      </section>

      {/* Filters */}
      <JobFilters
        search={search}
        location={location}
        jobType={jobType}
        onSearchChange={setSearch}
        onLocationChange={setLocation}
        onJobTypeChange={setJobType}
      />

      {/* Results */}
      {isLoading && (
        <div className="grid gap-5 lg:grid-cols-2">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            )
          )}
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
          <h2 className="text-lg font-bold text-slate-900">
            Unable to load jobs
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading &&
        !isError &&
        data && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {data.jobs.length}{" "}
                {data.jobs.length === 1
                  ? "job"
                  : "jobs"}{" "}
                found
              </p>
            </div>

            {data.jobs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <h2 className="text-xl font-bold text-slate-900">
                  No jobs found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or
                  filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {data.jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                  />
                ))}
              </div>
            )}
          </>
        )}
    </div>
  );
}

export default Jobs;