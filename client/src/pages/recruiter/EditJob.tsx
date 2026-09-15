import { ArrowLeft, BriefcaseBusiness, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import RecruiterJobForm from "../../components/recruiter/RecruiterJobForm";
import {
  useRecruiterJob,
  useUpdateJob,
} from "../../hooks/useRecruiterJobs";
import { useCompanies } from "../../hooks/useCompanies";

import type { UpdateJobData } from "../../api/recruiterJob.api";

function EditJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch the job
  const {
    data: job,
    isLoading,
    isError,
  } = useRecruiterJob(id || "");

  // Fetch companies
  const {
    data: companies = [],
    isLoading: companiesLoading,
  } = useCompanies();

  // Update job mutation
  const updateMutation = useUpdateJob();

  const handleUpdate = (data: UpdateJobData) => {
    if (!id) return;

    updateMutation.mutate(
      {
        jobId: id,
        data,
      },
      {
        onSuccess: () => {
          navigate("/recruiter/jobs");
        },
      }
    );
  };

  // Loading state
  if (isLoading || companiesLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2
            size={22}
            className="animate-spin"
          />
          <span>Loading job...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !job) {
    return (
      <div className="p-6 md:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Unable to load job
          </h2>

          <p className="mt-2 text-sm text-red-600">
            The job could not be found or something went wrong.
          </p>

          <Link
            to="/recruiter/jobs"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
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
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <BriefcaseBusiness size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Edit Job
            </h1>

            <p className="text-sm text-slate-500">
              Update the details of {job.title}
            </p>
          </div>
        </div>
      </div>

      {/* Job Form */}
      <RecruiterJobForm
        companies={companies}
        initialData={job}
        onSubmit={() => {}}
        onUpdate={handleUpdate}
        isSaving={updateMutation.isPending}
        submitLabel="Save Changes"
      />

      {/* Update Error */}
      {updateMutation.isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Failed to update the job. Please try again.
        </div>
      )}
    </div>
  );
}

export default EditJob;