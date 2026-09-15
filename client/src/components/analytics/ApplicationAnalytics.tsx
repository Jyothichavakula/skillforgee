import { Briefcase } from "lucide-react";

interface ApplicationAnalyticsProps {
  totalApplications: number;
  shortlisted: number;
  interviews: number;
  selected: number;
  rejected: number;
}

const ApplicationAnalytics = ({
  totalApplications,
  shortlisted,
  interviews,
  selected,
  rejected,
}: ApplicationAnalyticsProps) => {
  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div className="flex items-center gap-4 border-b border-neutral-800 pb-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
          <Briefcase size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Application Analytics
          </h2>

          <p className="text-sm text-neutral-400">
            Track your placement applications
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-center rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-4 transition hover:border-yellow-500/30">
          <span className="text-sm font-bold text-neutral-400">Total Applications</span>
          <span className="text-lg font-extrabold text-white">
            {totalApplications}
          </span>
        </div>

        <div className="flex justify-between items-center rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-4 transition hover:border-yellow-500/30">
          <span className="text-sm font-bold text-blue-400">Shortlisted</span>
          <span className="text-lg font-extrabold text-white">{shortlisted}</span>
        </div>

        <div className="flex justify-between items-center rounded-xl border border-neutral-800 bg-neutral-900/50 px-5 py-4 transition hover:border-yellow-500/30">
          <span className="text-sm font-bold text-purple-400">Interviews</span>
          <span className="text-lg font-extrabold text-white">{interviews}</span>
        </div>

        <div className="flex justify-between items-center rounded-xl border border-green-500/20 bg-green-500/5 px-5 py-4 transition hover:border-green-500/40">
          <span className="text-sm font-bold text-green-500">Selected</span>
          <span className="text-lg font-extrabold text-white">{selected}</span>
        </div>

        <div className="flex justify-between items-center rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-4 transition hover:border-red-500/40">
          <span className="text-sm font-bold text-red-500">Rejected</span>
          <span className="text-lg font-extrabold text-white">{rejected}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationAnalytics;