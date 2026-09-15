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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Coding Progress
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your problem-solving progress.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Code2 size={21} />
        </div>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            Problems Solved
          </span>

          <span className="text-sm font-semibold text-slate-900">
            {solved}/{total}
          </span>
        </div>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-700"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-right text-xs text-slate-400">
          {percentage}% completed
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">
            Attempted
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {attempted}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">
            Remaining
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            {Math.max(total - solved, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CodingProgressCard;