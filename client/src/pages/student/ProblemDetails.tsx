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

import ProblemStatusCard from "../../components/coding/ProblemStatusCard";

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
      ? "bg-green-500/10 text-green-400 border border-green-500/20"
      : problem?.difficulty === "MEDIUM"
      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
      : "bg-red-500/10 text-red-400 border border-red-500/20";

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
      <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="h-8 w-32 animate-pulse rounded bg-neutral-800" />
        <div className="h-64 animate-pulse rounded-2xl bg-[#121215]" />
        <div className="h-48 animate-pulse rounded-2xl bg-[#121215]" />
      </div>
    );
  }

  if (isProblemError || !problem) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-[#121215] p-10 text-center max-w-2xl mx-auto mt-10">
        <h2 className="text-xl font-bold text-white">
          Problem not found
        </h2>

        <p className="mt-2 text-sm text-neutral-400">
          We couldn't load this coding problem.
        </p>

        <button
          onClick={() =>
            navigate("/student/coding")
          }
          className="mt-5 rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-yellow-400 transition"
        >
          Back to Coding Practice
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Back */}
      <button
        type="button"
        onClick={() =>
          navigate("/student/coding")
        }
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition hover:text-yellow-400"
      >
        <ArrowLeft size={18} />
        Back to Coding Practice
      </button>

      {/* Problem Header */}
      <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyClass}`}
              >
                {problem.difficulty}
              </span>

              <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                Coding Problem
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white">
              {problem.title}
            </h1>
          </div>

          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 border border-neutral-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-yellow-500 hover:text-black hover:border-yellow-500"
            >
              Open LeetCode
              <ExternalLink size={17} />
            </a>
          )}
        </div>

        {/* Topics */}
        {problem.topics.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
              Topics
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {problem.topics.map(
                (topic) => (
                  <span
                    key={topic}
                    className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 border border-neutral-800"
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
            <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
              Asked By
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {problem.companyTags.map(
                (company) => (
                  <span
                    key={company}
                    className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-neutral-300 border border-neutral-800"
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
        <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm lg:col-span-2 md:p-8">
          <h2 className="text-xl font-bold text-white">
            Problem Description
          </h2>

          <div className="mt-5 whitespace-pre-line text-sm leading-7 text-neutral-300 prose prose-invert max-w-none">
            {problem.description}
          </div>
        </section>

        {/* Progress */}
        <div>
          <ProblemStatusCard
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