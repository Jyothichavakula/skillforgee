import { Target, CheckCircle2 } from "lucide-react";

interface ProblemProgressProps {
  totalSolved: number;
  totalAttempted: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

function ProblemProgress({
  totalSolved,
  totalAttempted,
  easySolved,
  mediumSolved,
  hardSolved,
}: ProblemProgressProps) {
  // Simple layout showing total, and easy/medium/hard breakdown
  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
      <h3 className="mb-6 flex items-center gap-2 text-base font-bold text-white">
        <Target className="h-5 w-5 text-yellow-500" />
        Problem Solving Progress
      </h3>

      <div className="grid gap-6 md:grid-cols-4">
        {/* Total stats */}
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="mb-1 text-sm font-medium text-neutral-400">Total Solved</div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalSolved}</span>
            <span className="text-sm font-medium text-neutral-500">
              / {totalAttempted} attempted
            </span>
          </div>
        </div>

        {/* Difficulty breakdown */}
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium text-green-400">Easy</div>
            <div className="text-sm font-bold text-white">{easySolved}</div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (easySolved / Math.max(1, totalSolved)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium text-yellow-400">Medium</div>
            <div className="text-sm font-bold text-white">{mediumSolved}</div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (mediumSolved / Math.max(1, totalSolved)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium text-red-500">Hard</div>
            <div className="text-sm font-bold text-white">{hardSolved}</div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${Math.min(100, (hardSolved / Math.max(1, totalSolved)) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemProgress;