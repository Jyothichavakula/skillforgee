import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock } from "lucide-react";
import type { Problem } from "../../api/problem.api";

interface RecommendedProblemCardProps {
  problem: Problem;
}

function RecommendedProblemCard({ problem }: RecommendedProblemCardProps) {
  return (
    <Link
      to={`/student/coding/${problem._id}`}
      className="group flex flex-col justify-between rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-5 shadow-sm transition hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:shadow-md"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-semibold text-yellow-500">
            <Star className="h-3 w-3" />
            Recommended
          </div>
          
          <div
            className={`text-xs font-bold ${
              problem.difficulty === "EASY"
                ? "text-green-500"
                : problem.difficulty === "MEDIUM"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {problem.difficulty}
          </div>
        </div>

        <h4 className="mb-2 text-lg font-bold text-white transition group-hover:text-yellow-400">
          {problem.title}
        </h4>
        
        <p className="line-clamp-2 text-sm text-neutral-400">
          {problem.description || "A recommended problem to help you improve your skills based on your current roadmap."}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5 text-neutral-500">
          <Clock className="h-4 w-4" />
          <span>Practice now</span>
        </div>
        
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-white transition group-hover:bg-yellow-500 group-hover:text-black">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}

export default RecommendedProblemCard;