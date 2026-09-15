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
    <div className="overflow-hidden rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 text-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
            Your Progress
          </p>

          <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
            Keep forging ahead
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
          <Trophy size={22} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/70 p-4">
          <Zap
            size={18}
            className="text-yellow-400"
          />

          <p className="mt-3 text-xs font-medium uppercase text-neutral-400">
            XP
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {xp}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/70 p-4">
          <Target
            size={18}
            className="text-yellow-400"
          />

          <p className="mt-3 text-xs font-medium uppercase text-neutral-400">
            Level
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {level}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/70 p-4">
          <Trophy
            size={18}
            className="text-yellow-400"
          />

          <p className="mt-3 text-xs font-medium uppercase text-neutral-400">
            Badges
          </p>

          <p className="mt-1 text-xl font-bold text-white">
            {achievements}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-400">
            Progress to next level
          </span>

          <span className="font-bold text-yellow-400">
            {xpProgress}/100 XP
          </span>
        </div>

        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-900 border border-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-sm shadow-yellow-500/50 transition-all duration-700"
            style={{
              width: `${xpProgress}%`,
            }}
          />
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-neutral-400">
        {problemsSolved} coding problems solved
      </p>
    </div>
  );
}

export default GamificationCard;