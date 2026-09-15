import type { LucideIcon } from "lucide-react";

interface RecruiterStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
}

function RecruiterStatCard({
  title,
  value,
  icon: Icon,
  description,
}: RecruiterStatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </div>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-700">
        {title}
      </h3>

      {description && (
        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default RecruiterStatCard;