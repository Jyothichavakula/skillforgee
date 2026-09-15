import { Map } from "lucide-react";

interface RoadmapProgressCardProps {
  progress: number;
  totalTopics: number;
  completedTopics: number;
}

function RoadmapProgressCard({
  progress,
  totalTopics,
  completedTopics,
}: RoadmapProgressCardProps) {
  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Learning Roadmap
          </h2>

          <p className="mt-1 text-sm text-neutral-400">
            Your overall learning progress.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
          <Map size={21} />
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-end justify-between">
          <span className="text-sm font-medium text-neutral-300">
            Overall Progress
          </span>

          <span className="text-2xl font-bold text-yellow-400">
            {safeProgress}%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-neutral-900 border border-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-sm shadow-yellow-500/50 transition-all duration-700"
            style={{
              width: `${safeProgress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Total Topics
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {totalTopics}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Completed
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {completedTopics}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoadmapProgressCard;