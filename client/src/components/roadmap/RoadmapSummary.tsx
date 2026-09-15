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
      <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
            <TrendingUp size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Overall Progress
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-yellow-400">
              {roadmap.overallProgressPercentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Completed Topics */}
      <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white border border-white/20">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Completed Topics
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-white">
              {roadmap.completedTopics}
              <span className="text-sm font-medium text-neutral-500">
                {" "}
                / {roadmap.totalTopics}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Target size={20} />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              Learning Topics
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight text-white">
              {roadmap.totalTopics}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapSummary;