import {
  Trophy,
  Zap,
  Target,
} from "lucide-react";

interface GamificationCardProps {
  xp: number;
  level: number;
  problemsSolved: number;
  achievements: number;
}

function GamificationCard({
  xp,
  level,
  problemsSolved,
  achievements,
}: GamificationCardProps) {
  const xpInCurrentLevel =
    xp % 100;

  const xpProgress =
    xpInCurrentLevel;

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-300">
            Your Progress
          </p>

          <h2 className="mt-1 text-xl font-bold">
            Keep forging ahead
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
          <Trophy size={22} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white/5 p-4">
          <Zap
            size={18}
            className="text-indigo-400"
          />

          <p className="mt-3 text-xs text-slate-400">
            XP
          </p>

          <p className="mt-1 text-xl font-bold">
            {xp}
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <Target
            size={18}
            className="text-indigo-400"
          />

          <p className="mt-3 text-xs text-slate-400">
            Level
          </p>

          <p className="mt-1 text-xl font-bold">
            {level}
          </p>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <Trophy
            size={18}
            className="text-indigo-400"
          />

          <p className="mt-3 text-xs text-slate-400">
            Achievements
          </p>

          <p className="mt-1 text-xl font-bold">
            {achievements}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">
            Progress to next level
          </span>

          <span className="font-medium text-slate-300">
            {xpProgress}/100 XP
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-700"
            style={{
              width: `${xpProgress}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        {problemsSolved} coding problems solved
      </p>
    </div>
  );
}

export default GamificationCard;