import {
  Code2,
  ArrowRight,
} from "lucide-react";

import type {
  Problem,
} from "../../api/problem.api";

interface RecommendedProblemsProps {
  problems: Problem[];
}

function RecommendedProblems({
  problems,
}: RecommendedProblemsProps) {
  const recommended =
    problems.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recommended Problems
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Problems to continue your coding
            preparation.
          </p>
        </div>

        <Code2
          size={21}
          className="text-indigo-600"
        />
      </div>

      {recommended.length === 0 ? (
        <div className="py-10 text-center">
          <Code2
            size={32}
            className="mx-auto text-slate-300"
          />

          <p className="mt-3 text-sm font-medium text-slate-600">
            No problems available
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Check back after problems are added
            to your practice list.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {recommended.map(
            (problem) => (
              <div
                key={problem._id}
                className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {problem.title}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <DifficultyBadge
                      difficulty={
                        problem.difficulty
                      }
                    />

                    {problem.topics
                      .slice(0, 2)
                      .map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full bg-white px-2 py-1 text-[11px] font-medium text-slate-500"
                        >
                          {topic}
                        </span>
                      ))}
                  </div>
                </div>

                <button className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50">
                  Solve
                  <ArrowRight size={14} />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

function DifficultyBadge({
  difficulty,
}: {
  difficulty: string;
}) {
  const styles: Record<
    string,
    string
  > = {
    EASY:
      "bg-green-50 text-green-600",
    MEDIUM:
      "bg-yellow-50 text-yellow-600",
    HARD:
      "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
        styles[difficulty] ||
        "bg-slate-100 text-slate-500"
      }`}
    >
      {difficulty}
    </span>
  );
}

export default RecommendedProblems;