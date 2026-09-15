import { BarChart3, Target, Briefcase, Code2 } from "lucide-react";

interface AnalyticsOverviewProps {
  totalApplications: number;
  totalProblems: number;
  solvedProblems: number;
  overallProgress: number;
}

const AnalyticsOverview = ({
  totalApplications,
  totalProblems,
  solvedProblems,
  overallProgress,
}: AnalyticsOverviewProps) => {
  const stats = [
    {
      label: "Applications",
      value: totalApplications,
      icon: Briefcase,
    },
    {
      label: "Problems Attempted",
      value: totalProblems,
      icon: Code2,
    },
    {
      label: "Problems Solved",
      value: solvedProblems,
      icon: Target,
    },
    {
      label: "Overall Progress",
      value: `${overallProgress}%`,
      icon: BarChart3,
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
            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-yellow-500/10 to-transparent opacity-0 blur-md transition group-hover:opacity-100" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-neutral-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-white">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-yellow-500 transition group-hover:bg-yellow-500 group-hover:text-black">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsOverview;