import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import {
  useDeleteJob,
  useRecruiterJobs,
} from "../../hooks/useRecruiterJobs";

import RecruiterJobCard from "../../components/recruiter/RecruiterJobCard";
function RecruiterJobs() {
  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useRecruiterJobs();

  const deleteMutation = useDeleteJob();

  const handleDelete = (jobId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(jobId);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading jobs...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load jobs
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Jobs
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage your job postings.
          </p>
        </div>

        <Link
          to="/recruiter/jobs/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Job
        </Link>

      </div>

      {/* Jobs */}
      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            No jobs yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Create your first job posting to start receiving applications.
          </p>

          <Link
            to="/recruiter/jobs/create"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Job
          </Link>
        </div>
      ) : (
        <div className="grid gap-5">
          {jobs.map((job) => (
            <RecruiterJobCard
              key={job._id}
              job={job}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default RecruiterJobs;