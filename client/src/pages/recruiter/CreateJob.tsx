import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import RecruiterJobForm from "../../components/recruiter/RecruiterJobForm";

import { useCompanies } from "../../hooks/useCompanies";
import { useCreateJob } from "../../hooks/useRecruiterJobs";

import type { CreateJobData } from "../../api/recruiterJob.api";

function CreateJob() {
  const navigate = useNavigate();

  const {
    data: companies = [],
    isLoading: companiesLoading,
    isError: companiesError,
  } = useCompanies();

  const createMutation = useCreateJob();

  const handleSubmit = (
    data: CreateJobData
  ) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        navigate("/recruiter/jobs");
      },
    });
  };

  if (companiesLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading companies...
        </p>
      </div>
    );
  }

  if (companiesError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">
          Unable to load companies
        </h2>

        <p className="mt-1 text-sm text-red-600">
          Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <Link
          to="/recruiter/jobs"
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to My Jobs
        </Link>

        <h1 className="text-2xl font-bold text-slate-900">
          Create Job
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Create a new job posting for candidates.
        </p>
      </div>

      {/* Form */}
      <RecruiterJobForm
        companies={companies}
        onSubmit={handleSubmit}
        isSaving={createMutation.isPending}
        submitLabel="Create Job"
      />

      {/* Error */}
      {createMutation.isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Failed to create job. Please check your information and try again.
        </div>
      )}

    </div>
  );
}

export default CreateJob;