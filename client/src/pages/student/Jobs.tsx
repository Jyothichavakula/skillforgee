import { useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";

import type {
  JobType,
} from "../../api/job.api";

import { useJobs } from "../../hooks/useJobs";

import JobCard from "../../components/jobs/JobCard";
import JobFilters from "../../components/jobs/JobFilters";

function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<JobType | "">("");

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useJobs({
    search: search || undefined,
    location: location || undefined,
    jobType: jobType || undefined,
    status: "OPEN",
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Header */}
      <section className="border-b border-neutral-800 pb-6">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-500 mb-2">
          <Briefcase className="h-4 w-4" />
          Opportunities
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Find Your Next Opportunity
        </h1>

        <p className="mt-2 text-lg text-neutral-400">
          Discover jobs and internships that match your skills and career goals.
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
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4].map(
            (item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl bg-[#121215] border border-neutral-800/90 shadow-sm"
              />
            )
          )}
        </div>
      )}

      {isError && (
        <div className="rounded-2xl border border-red-500/20 bg-[#121215] p-10 text-center">
          <h2 className="text-xl font-bold text-white">
            Unable to load jobs
          </h2>

          <p className="mt-2 text-sm text-neutral-400">
            Please try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-extrabold text-black transition hover:bg-yellow-400"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading &&
        !isError &&
        data && (
          <>
            <div className="flex items-center justify-between border-b border-neutral-800/50 pb-4">
              <p className="text-sm font-bold text-neutral-400">
                <span className="text-white">{data.jobs.length}</span>{" "}
                {data.jobs.length === 1 ? "job" : "jobs"} found
              </p>
            </div>

            {data.jobs.length === 0 ? (
              <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500">
                  <Search className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  No jobs found
                </h2>

                <p className="mt-2 text-sm text-neutral-400">
                  Try changing your search or filters.
                </p>
                {(search || location || jobType) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setLocation("");
                      setJobType("");
                    }}
                    className="mt-6 rounded-xl bg-neutral-800 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-700 hover:text-yellow-400"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
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