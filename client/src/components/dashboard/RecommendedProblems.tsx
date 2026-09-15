import {
  Code2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import type {
  Problem,
} from "../../api/problem.api";

interface RecommendedProblemsProps {
  problems: Problem[];
}

function RecommendedProblems({
  problems,
}: RecommendedProblemsProps) {
  const navigate = useNavigate();
  const recommended =
    problems.slice(0, 5);

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Recommended Problems
          </h2>

          <p className="mt-1 text-sm text-neutral-400">
            Problems to continue your coding preparation.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
          <Code2 size={20} />
        </div>
      </div>

      {recommended.length === 0 ? (
        <div className="py-10 text-center">
          <Code2
            size={32}
            className="mx-auto text-neutral-600"
          />

          <p className="mt-3 text-sm font-medium text-neutral-300">
            No problems available
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            Check back after problems are added to your practice list.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {recommended.map(
            (problem) => (
              <div
                key={problem._id}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 transition hover:border-yellow-400/30 hover:bg-neutral-900"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
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
                          className="rounded-full border border-neutral-800 bg-neutral-950 px-2.5 py-0.5 text-[11px] font-medium text-neutral-400"
                        >
                          {topic}
                        </span>
                      ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/student/coding/${problem._id}`)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-400 border border-yellow-400/30 transition hover:bg-yellow-400 hover:text-black"
                >
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
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    MEDIUM:
      "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30",
    HARD:
      "bg-red-500/15 text-red-400 border border-red-500/30",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        styles[difficulty] ||
        "bg-neutral-800 text-neutral-400"
      }`}
    >
      {difficulty}
    </span>
  );
}

export default RecommendedProblems;