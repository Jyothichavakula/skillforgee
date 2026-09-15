import { Trophy } from "lucide-react";
import type { Achievement } from "../../api/gamification.api";

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({
  achievement,
}: AchievementCardProps) => {
  return (
    <div className="group rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm transition hover:border-yellow-500/30 hover:bg-neutral-900/50 hover:shadow-[0_4px_20px_rgba(234,179,8,0.05)]">
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-800 text-yellow-500 transition group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30">
          <Trophy size={26} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold text-white group-hover:text-yellow-400 transition">
            {achievement.name || achievement.type || "Achievement"}
          </h3>

          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
            {achievement.description ||
              "Achievement unlocked through your progress."}
          </p>

          {achievement.unlockedAt && (
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-neutral-500 border-t border-neutral-800/50 pt-3">
              Unlocked{" "}
              {new Date(
                achievement.unlockedAt
              ).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;