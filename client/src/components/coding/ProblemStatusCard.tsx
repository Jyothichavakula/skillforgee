import { CheckCircle2, Circle, Loader2, PlayCircle } from "lucide-react";

interface ProblemStatusCardProps {
  status: "NOT_STARTED" | "ATTEMPTED" | "SOLVED";
  isUpdating: boolean;
  onStatusChange: (status: "NOT_STARTED" | "ATTEMPTED" | "SOLVED") => void;
}

function ProblemStatusCard({ status, isUpdating, onStatusChange }: ProblemStatusCardProps) {
  return (
    <section className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm md:p-8">
      <h3 className="text-xl font-bold text-white">Your Progress</h3>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => onStatusChange("NOT_STARTED")}
          disabled={isUpdating}
          className={`flex items-center justify-between rounded-xl border p-4 transition ${
            status === "NOT_STARTED"
              ? "border-neutral-500 bg-neutral-800/50"
              : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <Circle
              className={`h-5 w-5 ${
                status === "NOT_STARTED" ? "text-neutral-400" : "text-neutral-600"
              }`}
            />
            <span
              className={`font-medium ${
                status === "NOT_STARTED" ? "text-white" : "text-neutral-400"
              }`}
            >
              Not Started
            </span>
          </div>

          {isUpdating && status === "NOT_STARTED" && (
            <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
          )}
        </button>

        <button
          onClick={() => onStatusChange("ATTEMPTED")}
          disabled={isUpdating}
          className={`flex items-center justify-between rounded-xl border p-4 transition ${
            status === "ATTEMPTED"
              ? "border-yellow-500/50 bg-yellow-500/10"
              : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-yellow-500/30"
          }`}
        >
          <div className="flex items-center gap-3">
            <PlayCircle
              className={`h-5 w-5 ${
                status === "ATTEMPTED" ? "text-yellow-500" : "text-neutral-600"
              }`}
            />
            <span
              className={`font-medium ${
                status === "ATTEMPTED" ? "text-yellow-400" : "text-neutral-400"
              }`}
            >
              Attempted
            </span>
          </div>

          {isUpdating && status === "ATTEMPTED" && (
            <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />
          )}
        </button>

        <button
          onClick={() => onStatusChange("SOLVED")}
          disabled={isUpdating}
          className={`flex items-center justify-between rounded-xl border p-4 transition ${
            status === "SOLVED"
              ? "border-green-500/50 bg-green-500/10"
              : "border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 hover:border-green-500/30"
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2
              className={`h-5 w-5 ${
                status === "SOLVED" ? "text-green-500" : "text-neutral-600"
              }`}
            />
            <span
              className={`font-medium ${
                status === "SOLVED" ? "text-green-400" : "text-neutral-400"
              }`}
            >
              Solved
            </span>
          </div>

          {isUpdating && status === "SOLVED" && (
            <Loader2 className="h-4 w-4 animate-spin text-green-500" />
          )}
        </button>
      </div>
    </section>
  );
}

export default ProblemStatusCard;
