import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  Send,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useJob } from "../../hooks/useJobs";
import {
  useCreateApplication,
} from "../../hooks/useApplications";

function ApplyJob() {
  const { id } =
    useParams<{ id: string }>();

  const navigate = useNavigate();

  const {
    data: job,
    isLoading,
    isError,
  } = useJob(id || "");

  const {
    mutateAsync,
    isPending,
  } = useCreateApplication();

  const [coverLetter, setCoverLetter] =
    useState("");

  const [resumeUrl, setResumeUrl] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!id) {
      setError("Invalid job.");
      return;
    }

    setError("");

    try {
      await mutateAsync({
        jobId: id,
        coverLetter:
          coverLetter.trim() || undefined,
        resumeUrl:
          resumeUrl.trim() || undefined,
      });

      navigate("/student/applications");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Unable to submit your application. Please try again."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />

        <div className="h-24 animate-pulse rounded-2xl bg-white" />

        <div className="h-96 animate-pulse rounded-2xl bg-white" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Unable to load job
        </h2>

        <button
          onClick={() =>
            navigate("/student/jobs")
          }
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

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          navigate(`/student/jobs/${job._id}`)
        }
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Job
      </button>

      {/* Job Summary */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-indigo-600">
          {company?.name || "Company"}
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Apply for {job.title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {job.location} • {job.jobType}
        </p>
      </section>

      {/* Application Form */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Application Form
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Submit your application for this position.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >
          {/* Cover Letter */}
          <div>
            <label
              htmlFor="coverLetter"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Cover Letter
            </label>

            <textarea
              id="coverLetter"
              value={coverLetter}
              onChange={(event) =>
                setCoverLetter(
                  event.target.value
                )
              }
              rows={8}
              placeholder="Tell the recruiter why you are a good fit for this role..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Optional
            </p>
          </div>

          {/* Resume URL */}
          <div>
            <label
              htmlFor="resumeUrl"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Resume URL
            </label>

            <input
              id="resumeUrl"
              type="url"
              value={resumeUrl}
              onChange={(event) =>
                setResumeUrl(
                  event.target.value
                )
              }
              placeholder="https://drive.google.com/..."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Optional — provide a link to your resume.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={18} />

            {isPending
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default ApplyJob;