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
        <h2 className="text-xl font-bold text-slate-900">
          Continue Your Preparation
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose an area and keep moving toward
          your placement goals.
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
              className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={20} />
                </div>

                <ArrowRight
                  size={17}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500"
                />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
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