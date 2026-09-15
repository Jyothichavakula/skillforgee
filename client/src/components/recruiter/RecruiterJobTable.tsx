import { MapPin, Users } from "lucide-react";
import type { RecruiterJob } from "../../api/recruiter.api";

interface RecruiterJobTableProps {
  jobs: RecruiterJob[];
}

function RecruiterJobTable({
  jobs,
}: RecruiterJobTableProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          My Jobs
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your posted jobs and applicants.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="p-8 text-center text-sm text-slate-400">
          No jobs posted yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 text-left">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Job
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Location
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Type
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Applicants
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">
                      {job.title}
                    </p>

                    {job.company?.name && (
                      <p className="mt-1 text-xs text-slate-400">
                        {job.company.name}
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <MapPin size={15} />
                      {job.location || "Not specified"}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {job.jobType || "Not specified"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Users size={15} />
                      {job.applicants}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        job.status === "OPEN"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecruiterJobTable;