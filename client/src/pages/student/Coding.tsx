import { useState } from "react";

import type {
  ProblemDifficulty,
} from "../../api/problem.api";

import { useProblems } from "../../hooks/useProblems";

import ProblemCard from "../../components/coding/ProblemCard";
import ProblemFilters from "../../components/coding/ProblemFilters";


import RecommendedProblemCard from "../../components/coding/RecommendedProblemCard";
import { useRecommendedProblems } from "../../hooks/useRecommendedProblems";

function Coding() {

    
  const [search, setSearch] =
    useState("");

  const [difficulty, setDifficulty] =
    useState<ProblemDifficulty | "">("");

  const [topic, setTopic] =
    useState("");

  const [company, setCompany] =
    useState("");

  

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useProblems({
    search: search || undefined,
    difficulty:
      difficulty || undefined,
    topic: topic || undefined,
    company:
      company || undefined,
  });

  const {
  data: recommendedProblems,
  isLoading: isRecommendationsLoading,
} = useRecommendedProblems({
  limit: 4,
});

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-indigo-600">
          Practice & Prepare
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Coding Practice
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Strengthen your problem-solving skills
          with coding problems curated for
          technical interviews and placements.
        </p>
      </section>

      {/* Recommended Problems */}
<section>
  <div className="mb-4">
    <p className="text-sm font-medium text-indigo-600">
      Personalized Practice
    </p>

    <h2 className="mt-1 text-xl font-bold text-slate-900">
      Recommended for You
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Problems selected based on your preparation
      progress and coding profile.
    </p>
  </div>

  {isRecommendationsLoading ? (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-56 animate-pulse rounded-2xl bg-white shadow-sm"
        />
      ))}
    </div>
  ) : recommendedProblems &&
    recommendedProblems.length > 0 ? (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {recommendedProblems.map(
        (problem) => (
          <RecommendedProblemCard
            key={problem._id}
            problem={problem}
          />
        )
      )}
    </div>
  ) : (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-sm text-slate-500">
        Start solving problems to unlock
        personalized recommendations.
      </p>
    </div>
  )}
</section>

      {/* Filters */}
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

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Unable to load problems
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Something went wrong while loading
            the coding problems.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {!isLoading &&
        !isError &&
        data && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {data.problems.length}{" "}
                {data.problems.length === 1
                  ? "problem"
                  : "problems"}{" "}
                found
              </p>
            </div>

            {data.problems.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <h2 className="text-xl font-bold text-slate-900">
                  No problems found
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or
                  filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {data.problems.map(
                  (problem) => (
                    <ProblemCard
                      key={problem._id}
                      problem={problem}
                    />
                  )
                )}
              </div>
            )}
          </>
        )}
    </div>
  );
}

export default Coding;