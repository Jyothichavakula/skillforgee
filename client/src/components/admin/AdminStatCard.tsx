import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
}


function AdminStatCard({
  title,
  value,
  icon: Icon,
  description,
}: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={21} />
        </div>

      </div>
    </div>
  );
}

export default AdminStatCard;