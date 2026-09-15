import { Code2 } from "lucide-react";

interface CodingProgressCardProps {
  solved: number;
  attempted: number;
  total: number;
}

function CodingProgressCard({
  solved,
  attempted,
  total,
}: CodingProgressCardProps) {
  const percentage =
    total > 0
      ? Math.min(
          Math.round((solved / total) * 100),
          100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Coding Progress
          </h2>

          <p className="mt-1 text-sm text-neutral-400">
            Your problem-solving progress.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
          <Code2 size={21} />
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-300">
            Problems Solved
          </span>

          <span className="text-sm font-bold text-yellow-400">
            {solved}/{total}
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-neutral-900 border border-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-sm shadow-yellow-500/50 transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-right text-xs font-semibold text-yellow-400">
          {percentage}% completed
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Attempted
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {attempted}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Remaining
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {Math.max(total - solved, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CodingProgressCard;