import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

import type {
  ProblemProgressStatus,
} from "../../api/problem.api";

interface ProblemProgressProps {
  status: ProblemProgressStatus;
  isUpdating: boolean;
  onStatusChange: (
    status: ProblemProgressStatus
  ) => void;
}

function ProblemProgress({
  status,
  isUpdating,
  onStatusChange,
}: ProblemProgressProps) {
  const options: {
    value: ProblemProgressStatus;
    label: string;
    description: string;
    icon: typeof Circle;
  }[] = [
    {
      value: "NOT_STARTED",
      label: "Not Started",
      description:
        "You haven't started this problem yet.",
      icon: Circle,
    },
    {
      value: "ATTEMPTED",
      label: "Attempted",
      description:
        "You have tried solving this problem.",
      icon: Clock3,
    },
    {
      value: "SOLVED",
      label: "Solved",
      description:
        "You successfully solved this problem.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">
        Your Progress
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Track your progress on this problem.
      </p>

      <div className="mt-5 space-y-3">
        {options.map((option) => {
          const Icon = option.icon;

          const selected =
            status === option.value;

          return (
            <button
              key={option.value}
              type="button"
              disabled={isUpdating}
              onClick={() =>
                onStatusChange(
                  option.value
                )
              }
              className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
              } ${
                isUpdating
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <Icon
                size={22}
                className={
                  selected
                    ? "mt-0.5 text-indigo-600"
                    : "mt-0.5 text-slate-400"
                }
              />

              <div>
                <p
                  className={`text-sm font-semibold ${
                    selected
                      ? "text-indigo-700"
                      : "text-slate-700"
                  }`}
                >
                  {option.label}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ProblemProgress;