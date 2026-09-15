import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Code2,
  FileText,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Career Coach",
    description:
      "Get personalized career guidance based on your skills, goals, and placement journey.",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    description:
      "Practice interview-focused coding problems and track your progress.",
  },
  {
    icon: FileText,
    title: "Resume Analyzer",
    description:
      "Analyze your resume and receive actionable ATS and skill recommendations.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement Tracking",
    description:
      "Track jobs, applications, interview stages, and placement opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Career Analytics",
    description:
      "Understand your preparation progress with meaningful career analytics.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Roadmap",
    description:
      "Follow a structured learning roadmap based on your preparation progress.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            SkillForge
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              AI-powered career & placement platform
            </span>

            <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Build your career.
              <span className="block text-slate-400">
                Forge your future.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              SkillForge brings coding practice, placement
              tracking, AI career guidance, resume analysis,
              and personalized learning into one platform.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Start Your Journey
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Everything you need
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              One platform for your placement journey
            </h2>

            <p className="mt-4 text-slate-400">
              Prepare smarter, track your progress, and move
              closer to your career goals.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} SkillForge. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;