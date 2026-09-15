import {
  ArrowRight,
  Building2,
  Tag,
} from "lucide-react";

import type {
  Problem,
} from "../../api/problem.api";

import { useNavigate } from "react-router-dom";

interface ProblemCardProps {
  problem: Problem;
}

function ProblemCard({
  problem,
}: ProblemCardProps) {
  const navigate = useNavigate();

  const difficultyClass =
    problem.difficulty === "EASY"
      ? "bg-green-50 text-green-700"
      : problem.difficulty === "MEDIUM"
      ? "bg-amber-50 text-amber-700"
      : "bg-red-50 text-red-700";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Coding Problem
          </p>

          <h2 className="mt-1 text-lg font-bold text-slate-900">
            {problem.title}
          </h2>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${difficultyClass}`}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
        {problem.description}
      </p>

      {/* Topics */}
      {problem.topics.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <Tag size={14} />
            Topics
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {problem.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Companies */}
      {problem.companyTags.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <Building2 size={14} />
            Companies
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {problem.companyTags.map(
              (company) => (
                <span
                  key={company}
                  className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
                >
                  {company}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {/* Button */}
      <div className="mt-auto pt-6">
        <button
          onClick={() =>
            navigate(
              `/student/coding/${problem._id}`
            )
          }
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
        >
          View Problem
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default ProblemCard;