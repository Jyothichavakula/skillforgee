import GamificationSummary from "../../components/gamification/GamificationSummary";
import AchievementCard from "../../components/gamification/AchievementCard";
import Leaderboard from "../../components/gamification/Leaderboard";
import { useGamification } from "../../hooks/useGamification";
import { Trophy } from "lucide-react";

const Gamification = () => {
  const { data, isLoading, isError } = useGamification();

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-[#121215] border border-neutral-800" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-2xl bg-[#121215] border border-neutral-800" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="max-w-3xl mx-auto mt-10 rounded-2xl border border-red-500/20 bg-[#121215] p-10 text-center">
        <p className="text-sm font-bold text-red-500">
          Failed to load gamification data.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-6">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-500 mb-2">
          <Trophy className="h-4 w-4" />
          Your Achievements
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Gamification
        </h1>

        <p className="mt-2 max-w-2xl text-lg text-neutral-400">
          Earn XP, solve problems, unlock achievements, and track your career preparation progress.
        </p>
      </div>

      {/* Summary */}
      <GamificationSummary
        xp={data.xp}
        level={data.level}
        problemsSolved={data.problemsSolved}
        achievementsCount={data.achievements.length}
      />

      {/* Achievements */}
      <div>
        <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
          <span className="h-8 w-2 rounded-full bg-yellow-500"></span>
          Unlocked Achievements
        </h2>

        {data.achievements.length === 0 ? (
          <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-10 text-center">
            <p className="text-sm font-bold text-neutral-500">
              No achievements unlocked yet. Keep solving problems to earn them!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.achievements.map((achievement, index) => (
              <AchievementCard
                key={`${achievement.name || achievement.type}-${index}`}
                achievement={achievement}
              />
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div className="pt-4">
        <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
          <span className="h-8 w-2 rounded-full bg-yellow-500"></span>
          Global Leaderboard
        </h2>
        <Leaderboard />
      </div>
    </div>
  );
};

export default Gamification;