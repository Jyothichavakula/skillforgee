import { Target } from "lucide-react";

interface ResumeScoreProps {
  score: number;
}

const ResumeScore = ({ score }: ResumeScoreProps) => {
  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8 relative overflow-hidden">
      {/* Glow effect based on score */}
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20 ${
        score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"
      }`}></div>

      <div className="relative z-10">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Target size={30} />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-neutral-400">ATS Score</p>
            <p className={`text-4xl font-black mt-1 ${
              score >= 80 ? "text-green-400" : score >= 60 ? "text-yellow-400" : "text-red-400"
            }`}>
              {score}%
            </p>
          </div>
        </div>

        <div className="mt-8 h-4 overflow-hidden rounded-full bg-neutral-800 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor] ${
              score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${Math.min(score, 100)}%` }}
          />
        </div>

        <p className="mt-4 text-sm font-medium text-neutral-400">
          Your resume compatibility score based on the AI analysis.
        </p>
      </div>
    </div>
  );
};

export default ResumeScore;