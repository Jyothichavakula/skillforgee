import { Trophy, Zap, Code2, Star } from "lucide-react";

interface GamificationSummaryProps {
  xp: number;
  level: number;
  problemsSolved: number;
  achievementsCount: number;
}

const GamificationSummary = ({
  xp,
  level,
  problemsSolved,
  achievementsCount,
}: GamificationSummaryProps) => {
  const stats = [
    {
      label: "Total XP",
      value: xp,
      icon: Zap,
    },
    {
      label: "Current Level",
      value: level,
      icon: Star,
    },
    {
      label: "Problems Solved",
      value: problemsSolved,
      icon: Code2,
    },
    {
      label: "Achievements",
      value: achievementsCount,
      icon: Trophy,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm transition hover:border-yellow-500/30"
          >
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-yellow-500/10 to-transparent opacity-0 blur-md transition group-hover:opacity-100" />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-neutral-400">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-yellow-500 transition group-hover:bg-yellow-500 group-hover:text-black">
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GamificationSummary;