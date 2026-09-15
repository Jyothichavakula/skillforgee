import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-neutral-800/90 bg-[#121215] p-5.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-500/5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition">
          <Icon size={20} />
        </div>

        <TrendingUp
          size={17}
          className="text-yellow-400/60 group-hover:text-yellow-400 transition"
        />
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
        {title}
      </p>

      <p className="mt-1.5 text-2xl font-bold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-neutral-400">
        {description}
      </p>
    </div>
  );
}

export default StatCard;