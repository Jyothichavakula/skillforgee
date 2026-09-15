import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Code2, Loader2, Sparkles, Filter, ChevronRight } from "lucide-react";

import {
  getProblems,
  type ProblemDifficulty,
} from "../../api/problem.api";

import ProblemCard from "../../components/coding/ProblemCard";
import ProblemFilters from "../../components/coding/ProblemFilters";
import RecommendedProblemCard from "../../components/coding/RecommendedProblemCard";

function Coding() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<
    ProblemDifficulty | ""
  >("");
  const [topic, setTopic] = useState("");
  const [company, setCompany] = useState("");

  const {
    data: problemsResponse,
    isLoading: isProblemsLoading,
    error: problemsError,
  } = useQuery({
    queryKey: [
      "problems",
      { search, difficulty, topic, company },
    ],
    queryFn: () =>
      getProblems({
        search: search || undefined,
        difficulty: difficulty || undefined,
        topic: topic || undefined,
        company: company || undefined,
        limit: 20,
      }),
  });

  const problems = problemsResponse?.problems || [];

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 pb-20 md:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8 border-b border-neutral-800 pb-6">
        <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-500/20">
            <Code2 className="h-6 w-6" />
          </div>
          Practice Coding
        </h1>
        <p className="mt-3 text-lg text-neutral-400">
          Improve your problem-solving skills and prepare for technical interviews.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Problem List */}
        <div className="space-y-6 lg:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Filter className="h-5 w-5 text-neutral-500" />
              Problem Library
            </h2>
          </div>

          <ProblemFilters
            search={search}
            difficulty={difficulty}
            topic={topic}
            company={company}
            onSearchChange={setSearch}
            onDifficultyChange={setDifficulty}
            onTopicChange={setTopic}
            onCompanyChange={setCompany}
          />

          <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] shadow-sm">
            {isProblemsLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
              </div>
            ) : problemsError ? (
              <div className="p-8 text-center text-red-500">
                Failed to load problems. Please try again.
              </div>
            ) : problems.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900/50 text-neutral-600">
                  <Code2 className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">No problems found</h3>
                <p className="text-neutral-400">
                  Try adjusting your filters to find what you're looking for.
                </p>
                {(search || difficulty || topic || company) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setDifficulty("");
                      setTopic("");
                      setCompany("");
                    }}
                    className="mt-6 rounded-xl bg-yellow-500 px-6 py-2.5 font-bold text-black transition hover:bg-yellow-400"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-neutral-800/80">
                {problems.map((problem) => (
                  <ProblemCard
                    key={problem._id}
                    problem={problem}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-4">
          {/* Recommended Problems */}
          <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-5 shadow-sm">
            <h3 className="mb-4 flex items-center justify-between text-base font-bold text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Recommended for You
              </div>
            </h3>

            {isProblemsLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />
              </div>
            ) : problems.length > 0 ? (
              <div className="space-y-4">
                {problems.slice(0, 2).map((problem) => (
                  <RecommendedProblemCard
                    key={problem._id}
                    problem={problem}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-sm text-neutral-500">
                No recommendations right now.
              </div>
            )}
          </div>
          
          {/* Daily Challenge (Placeholder for UI) */}
          <div className="overflow-hidden rounded-2xl border border-neutral-800/90 bg-[#121215] shadow-sm">
            <div className="bg-gradient-to-r from-yellow-500/20 to-transparent p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-bold text-black">
                  DAILY CHALLENGE
                </span>
              </div>
              <h4 className="mb-1 text-lg font-bold text-white">Two Sum</h4>
              <p className="mb-4 text-sm text-neutral-400">Complete the daily challenge to earn extra points and keep your streak alive.</p>
              
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-neutral-200">
                Solve Challenge <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coding;