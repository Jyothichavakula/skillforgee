import { Code2 } from "lucide-react";

interface CodingAnalyticsProps {
  totalProblems: number;
  solvedProblems: number;
  attemptedProblems: number;
}

const CodingAnalytics = ({
  totalProblems,
  solvedProblems,
  attemptedProblems,
}: CodingAnalyticsProps) => {
  const solvedPercentage =
    totalProblems > 0
      ? Math.round((solvedProblems / totalProblems) * 100)
      : 0;

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div className="flex items-center gap-4 border-b border-neutral-800 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
          <Code2 size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Coding Progress
          </h2>
          <p className="text-sm text-neutral-400">
            Your problem-solving activity
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center">
          <p className="text-2xl font-extrabold text-white">{totalProblems}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-neutral-500">Total</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center">
          <p className="text-2xl font-extrabold text-white">
            {attemptedProblems}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-neutral-500">Attempted</p>
        </div>

        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
          <p className="text-2xl font-extrabold text-yellow-500">{solvedProblems}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-yellow-500/70">Solved</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-400">Solve Rate</span>
          <span className="text-lg font-extrabold text-white">{solvedPercentage}%</span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-neutral-800">
          <div
            className="h-full rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
            style={{ width: `${solvedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodingAnalytics;