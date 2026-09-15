import {
  CheckCircle2,
  Circle,
  Clock3,
} from "lucide-react";

import type {
  RoadmapTopic,
} from "../../api/roadmap.api";

interface RoadmapTopicCardProps {
  topic: RoadmapTopic;
}

function RoadmapTopicCard({
  topic,
}: RoadmapTopicCardProps) {
  const progress = Math.min(
    100,
    Math.max(
      0,
      topic.progressPercentage
    )
  );

  const getStatusIcon = () => {
    if (topic.status === "COMPLETED") {
      return (
        <CheckCircle2
          size={20}
          className="text-green-600"
        />
      );
    }

    if (topic.status === "IN_PROGRESS") {
      return (
        <Clock3
          size={20}
          className="text-amber-600"
        />
      );
    }

    return (
      <Circle
        size={20}
        className="text-slate-400"
      />
    );
  };

  const getStatusLabel = () => {
    if (topic.status === "COMPLETED") {
      return "Completed";
    }

    if (topic.status === "IN_PROGRESS") {
      return "In Progress";
    }

    return "Not Started";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {topic.topic}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {topic.solvedProblems} of{" "}
            {topic.totalProblems} problems solved
          </p>
        </div>

        {getStatusIcon()}
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-500">
            Progress
          </span>

          <span className="font-bold text-slate-700">
            {progress}%
          </span>
        </div>

        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-lg font-bold text-slate-900">
            {topic.totalProblems}
          </p>

          <p className="text-xs text-slate-500">
            Total
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-lg font-bold text-green-600">
            {topic.solvedProblems}
          </p>

          <p className="text-xs text-slate-500">
            Solved
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 text-center">
          <p className="text-lg font-bold text-amber-600">
            {topic.attemptedProblems}
          </p>

          <p className="text-xs text-slate-500">
            Attempted
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <span
          className={`text-xs font-semibold ${
            topic.status === "COMPLETED"
              ? "text-green-600"
              : topic.status === "IN_PROGRESS"
              ? "text-amber-600"
              : "text-slate-500"
          }`}
        >
          {getStatusLabel()}
        </span>
      </div>
    </div>
  );
}

export default RoadmapTopicCard;