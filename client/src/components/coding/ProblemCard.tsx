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
      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
      : problem.difficulty === "MEDIUM"
      ? "bg-yellow-400/15 text-yellow-400 border border-yellow-400/30"
      : "bg-red-500/15 text-red-400 border border-red-500/30";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-500/5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
            Coding Problem
          </p>

          <h2 className="mt-1 text-lg font-bold tracking-tight text-white">
            {problem.title}
          </h2>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-semibold ${difficultyClass}`}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-400">
        {problem.description}
      </p>

      {/* Topics */}
      {problem.topics.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <Tag size={14} />
            Topics
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {problem.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-lg border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 text-xs font-medium text-neutral-300"
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
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <Building2 size={14} />
            Companies
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {problem.companyTags.map(
              (company) => (
                <span
                  key={company}
                  className="rounded-lg border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1 text-xs font-medium text-yellow-400"
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black shadow-sm"
        >
          View Problem
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

export default ProblemCard;