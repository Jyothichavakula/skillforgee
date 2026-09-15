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
          className="text-yellow-400"
        />
      );
    }

    if (topic.status === "IN_PROGRESS") {
      return (
        <Clock3
          size={20}
          className="text-amber-400"
        />
      );
    }

    return (
      <Circle
        size={20}
        className="text-neutral-600"
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
    <div className="group rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm transition hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-500/5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-yellow-400 transition">
            {topic.topic}
          </h3>

          <p className="mt-1 text-sm text-neutral-400">
            {topic.solvedProblems} of{" "}
            {topic.totalProblems} problems solved
          </p>
        </div>

        {getStatusIcon()}
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-neutral-400">
            Progress
          </span>

          <span className="font-bold text-yellow-400">
            {progress}%
          </span>
        </div>

        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-900 border border-neutral-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-sm shadow-yellow-500/50 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3 text-center">
          <p className="text-lg font-bold text-white">
            {topic.totalProblems}
          </p>

          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Total
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3 text-center">
          <p className="text-lg font-bold text-yellow-400">
            {topic.solvedProblems}
          </p>

          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Solved
          </p>
        </div>

        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-3 text-center">
          <p className="text-lg font-bold text-amber-400">
            {topic.attemptedProblems}
          </p>

          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            Attempted
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mt-5 border-t border-neutral-800/80 pt-4">
        <span
          className={`text-xs font-semibold ${
            topic.status === "COMPLETED"
              ? "text-yellow-400"
              : topic.status === "IN_PROGRESS"
              ? "text-amber-400"
              : "text-neutral-500"
          }`}
        >
          {getStatusLabel()}
        </span>
      </div>
    </div>
  );
}

export default RoadmapTopicCard;