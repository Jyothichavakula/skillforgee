import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  Send,
  Briefcase,
  MapPin,
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
      <div className="space-y-6 max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="h-8 w-32 animate-pulse rounded bg-neutral-800" />
        <div className="h-32 animate-pulse rounded-2xl bg-[#121215]" />
        <div className="h-[500px] animate-pulse rounded-2xl bg-[#121215]" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="max-w-2xl mx-auto mt-10 rounded-2xl border border-red-500/20 bg-[#121215] p-10 text-center">
        <h2 className="text-xl font-bold text-white">
          Unable to load job
        </h2>

        <button
          onClick={() =>
            navigate("/student/jobs")
          }
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

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 pb-20 md:p-6 lg:p-8">
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          navigate(`/student/jobs/${job._id}`)
        }
        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-yellow-400 transition"
      >
        <ArrowLeft size={18} />
        Back to Job
      </button>

      {/* Job Summary */}
      <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 text-2xl font-black text-white">
            {company?.name?.charAt(0).toUpperCase() || "C"}
          </div>
          
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-neutral-500">
              {company?.name || "Company"}
            </p>

            <h1 className="mt-1 text-2xl font-extrabold text-white">
              Apply for {job.title}
            </h1>

            <div className="mt-2 flex flex-wrap gap-4 text-sm font-medium text-neutral-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-neutral-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} className="text-neutral-500" />
                {job.jobType.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="border-b border-neutral-800 pb-5 mb-8">
            <h2 className="text-2xl font-extrabold text-white">
              Application Form
            </h2>

            <p className="mt-2 text-sm text-neutral-400">
              Submit your application for this position. Make sure your profile is up to date before applying.
            </p>
          </div>

          {error && (
            <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-500">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Cover Letter */}
            <div>
              <label
                htmlFor="coverLetter"
                className="mb-2 block text-sm font-bold text-neutral-300"
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
                className="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
              />

              <p className="mt-2 text-xs font-medium text-neutral-500">
                Optional — Write a brief message highlighting your skills.
              </p>
            </div>

            {/* Resume URL */}
            <div>
              <label
                htmlFor="resumeUrl"
                className="mb-2 block text-sm font-bold text-neutral-300"
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
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900/90 px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/20"
              />

              <p className="mt-2 text-xs font-medium text-neutral-500">
                Optional — Provide a public link to your resume (Google Drive, Dropbox, etc.). If left blank, your profile details will be used.
              </p>
            </div>

            {/* Submit */}
            <div className="border-t border-neutral-800 pt-6">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-4 text-sm font-extrabold text-black transition hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />

                {isPending
                  ? "Submitting Application..."
                  : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ApplyJob;