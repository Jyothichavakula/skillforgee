import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useProblem } from "../../hooks/useProblems";

import {
  useProblemProgress,
  useUpdateProblemProgress,
} from "../../hooks/useProblemProgress";

import ProblemProgress from "../../components/coding/ProblemProgress";

function ProblemDetails() {
  const { id } =
    useParams<{ id: string }>();

  const navigate = useNavigate();

  const {
    data: problem,
    isLoading: isProblemLoading,
    isError: isProblemError,
  } = useProblem(id || "");

  const {
    data: progress,
    isLoading: isProgressLoading,
  } = useProblemProgress(id || "");

  const updateProgress =
    useUpdateProblemProgress(id || "");

  const currentStatus =
    progress?.status || "NOT_STARTED";

  const difficultyClass =
    problem?.difficulty === "EASY"
      ? "bg-green-50 text-green-700"
      : problem?.difficulty === "MEDIUM"
      ? "bg-amber-50 text-amber-700"
      : "bg-red-50 text-red-700";

  const handleStatusChange = async (
    status:
      | "NOT_STARTED"
      | "ATTEMPTED"
      | "SOLVED"
  ) => {
    if (!id) {
      return;
    }

    try {
      await updateProgress.mutateAsync(
        status
      );
    } catch {
      // Error handling can be improved with a toast later.
    }
  };

  if (
    isProblemLoading ||
    isProgressLoading
  ) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />

        <div className="h-64 animate-pulse rounded-2xl bg-white" />

        <div className="h-48 animate-pulse rounded-2xl bg-white" />
      </div>
    );
  }

  if (isProblemError || !problem) {
    return (
      <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
        <h2 className="text-xl font-bold text-slate-900">
          Problem not found
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          We couldn't load this coding problem.
        </p>

        <button
          onClick={() =>
            navigate("/student/coding")
          }
          className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Coding Practice
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          navigate("/student/coding")
        }
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Coding Practice
      </button>

      {/* Problem Header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyClass}`}
              >
                {problem.difficulty}
              </span>

              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Coding Problem
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {problem.title}
            </h1>
          </div>

          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Open LeetCode
              <ExternalLink size={17} />
            </a>
          )}
        </div>

        {/* Topics */}
        {problem.topics.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Topics
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {problem.topics.map(
                (topic) => (
                  <span
                    key={topic}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                  >
                    {topic}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* Companies */}
        {problem.companyTags.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Asked By
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {problem.companyTags.map(
                (company) => (
                  <span
                    key={company}
                    className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Description */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2 md:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Problem Description
          </h2>

          <div className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
            {problem.description}
          </div>
        </section>

        {/* Progress */}
        <div>
          <ProblemProgress
            status={currentStatus}
            isUpdating={
              updateProgress.isPending
            }
            onStatusChange={
              handleStatusChange
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;