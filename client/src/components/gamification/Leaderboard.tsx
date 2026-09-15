import { Trophy, Crown } from "lucide-react";

const Leaderboard = () => {
  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

      <div className="flex items-center gap-5 border-b border-neutral-800 pb-6 relative z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
          <Crown size={28} />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-white">
            Leaderboard
          </h2>

          <p className="text-sm font-medium text-neutral-400">
            Compare your progress with other students.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-12 text-center relative z-10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500">
          <Trophy size={32} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
        <p className="text-sm text-neutral-500">
          Leaderboard data and rankings will be available soon. Keep earning XP!
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;