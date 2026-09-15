import {
  Code2,
  FileSearch,
  Briefcase,
  Bot,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Practice Coding",
    description:
      "Solve problems and improve your DSA skills.",
    path: "/student/coding",
    icon: Code2,
  },
  {
    title: "Analyze Resume",
    description:
      "Improve your ATS score and resume quality.",
    path: "/student/resume",
    icon: FileSearch,
  },
  {
    title: "Find Jobs",
    description:
      "Explore opportunities matching your skills.",
    path: "/student/jobs",
    icon: Briefcase,
  },
  {
    title: "Ask AI Coach",
    description:
      "Get personalized career guidance.",
    path: "/student/career-coach",
    icon: Bot,
  },
];

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section>
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Continue Your Preparation
        </h2>

        <p className="mt-1 text-sm text-neutral-400">
          Choose an area and keep moving toward your placement goals.
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.path}
              onClick={() =>
                navigate(action.path)
              }
              className="group rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/40 transition">
                  <Icon size={20} />
                </div>

                <ArrowRight
                  size={17}
                  className="text-neutral-500 transition group-hover:translate-x-1 group-hover:text-yellow-400"
                />
              </div>

              <h3 className="mt-4 font-semibold text-white group-hover:text-yellow-400 transition">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-neutral-400">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;