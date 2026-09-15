import { FileText, Target } from "lucide-react";
import type { ResumeAnalysis } from "../../api/resume.api";

interface ResumeHistoryProps {
  analyses: ResumeAnalysis[];
}

const ResumeHistory = ({ analyses }: ResumeHistoryProps) => {
  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-4 border-b border-neutral-800 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400">
          <FileText size={20} />
        </div>

        <h2 className="text-xl font-bold text-white">
          Previous Analyses
        </h2>
      </div>

      {analyses.length === 0 ? (
        <div className="rounded-xl border border-neutral-800/50 bg-neutral-900/30 p-8 text-center">
          <p className="text-sm font-bold text-neutral-500">
            No previous resume analyses found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis._id}
              className="group flex items-center justify-between rounded-xl border border-neutral-800/50 bg-neutral-900/50 p-5 transition hover:border-yellow-500/30 hover:bg-neutral-900"
            >
              <div>
                <p className="text-base font-bold text-white group-hover:text-yellow-400 transition">
                  {analysis.fileName || "Resume"}
                </p>

                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-neutral-500">
                  {new Date(analysis.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Target size={16} className={
                  analysis.atsScore >= 80 ? "text-green-500" : analysis.atsScore >= 60 ? "text-yellow-500" : "text-red-500"
                } />
                <span className={`text-lg font-black ${
                  analysis.atsScore >= 80 ? "text-green-400" : analysis.atsScore >= 60 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {analysis.atsScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeHistory;