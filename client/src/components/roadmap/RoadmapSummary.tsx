import {
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

import type {
  RoadmapData,
} from "../../api/roadmap.api";

interface RoadmapSummaryProps {
  roadmap: RoadmapData;
}

function RoadmapSummary({
  roadmap,
}: RoadmapSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Overall Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <TrendingUp size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Overall Progress
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {roadmap.overallProgressPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Completed Topics */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Completed Topics
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {roadmap.completedTopics}
              <span className="text-base font-medium text-slate-400">
                {" "}
                / {roadmap.totalTopics}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Target size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Learning Topics
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {roadmap.totalTopics}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapSummary;