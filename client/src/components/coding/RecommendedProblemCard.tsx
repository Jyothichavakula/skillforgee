import {
  ArrowRight,
  Building2,
  Tag,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import type {
  Problem,
} from "../../api/problem.api";

interface RecommendedProblemCardProps {
  problem: Problem;
}

function RecommendedProblemCard({
  problem,
}: RecommendedProblemCardProps) {
  const navigate = useNavigate();

  const difficultyClass =
    problem.difficulty === "EASY"
      ? "bg-green-50 text-green-700"
      : problem.difficulty === "MEDIUM"
      ? "bg-amber-50 text-amber-700"
      : "bg-red-50 text-red-700";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-500">
            Recommended for you
          </p>

          <h3 className="mt-1 text-base font-bold text-slate-900">
            {problem.title}
          </h3>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyClass}`}
        >
          {problem.difficulty}
        </span>
      </div>

      {problem.topics.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {problem.topics.slice(0, 3).map(
            (topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                <Tag size={12} />
                {topic}
              </span>
            )
          )}
        </div>
      )}

      {problem.companyTags.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Building2 size={13} />

          {problem.companyTags
            .slice(0, 3)
            .join(", ")}
        </div>
      )}

      <button
        type="button"
        onClick={() =>
          navigate(
            `/student/coding/${problem._id}`
          )
        }
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600"
      >
        Practice Problem
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

export default RecommendedProblemCard;