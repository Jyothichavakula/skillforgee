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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Learning Roadmap
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your overall learning progress.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Map size={21} />
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-end justify-between">
          <span className="text-sm text-slate-500">
            Overall Progress
          </span>

          <span className="text-2xl font-bold text-slate-900">
            {safeProgress}%
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-700"
            style={{
              width: `${safeProgress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">
            Total Topics
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {totalTopics}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">
            Completed
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {completedTopics}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoadmapProgressCard;