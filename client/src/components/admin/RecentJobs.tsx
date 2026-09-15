import {
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

import type {
  AdminJob,
} from "../../api/admin.api";


interface RecentJobsProps {
  jobs: AdminJob[];
}


function RecentJobs({
  jobs,
}: RecentJobsProps) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 p-5">

        <h2 className="text-lg font-semibold text-slate-900">
          Recent Jobs
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest jobs posted on SkillForge
        </p>

      </div>


      <div className="divide-y divide-slate-100">

        {jobs.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            No jobs found.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="flex items-center justify-between gap-4 p-5"
            >

              <div className="min-w-0">

                <div className="flex items-center gap-2">

                  <BriefcaseBusiness
                    size={17}
                    className="shrink-0 text-indigo-500"
                  />

                  <p className="truncate text-sm font-semibold text-slate-900">
                    {job.title}
                  </p>

                </div>


                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">

                  {job.companyId?.name && (
                    <span>
                      {job.companyId.name}
                    </span>
                  )}

                  {job.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                  )}

                </div>

              </div>


              <span
                className={`shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                  job.status === "OPEN"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {job.status}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default RecentJobs;