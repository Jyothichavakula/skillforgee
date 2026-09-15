import {
  useRoadmap,
} from "../../hooks/useRoadmap";

import RoadmapSummary from "../../components/roadmap/RoadmapSummary";

import RoadmapTopicCard from "../../components/roadmap/RoadmapTopicCard";

function Roadmap() {
  const {
    data: roadmap,
    isLoading,
    isError,
    refetch,
  } = useRoadmap();

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-indigo-600">
          Your Learning Journey
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Learning Roadmap
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Build your technical skills step by
          step and track your interview
          preparation progress.
        </p>
      </section>

      {/* Loading */}
      {isLoading && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        </>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Unable to load your roadmap
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Something went wrong while loading
            your learning roadmap.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Roadmap */}
      {!isLoading &&
        !isError &&
        roadmap && (
          <>
            <RoadmapSummary
              roadmap={roadmap}
            />

            {roadmap.topics.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <h2 className="text-xl font-bold text-slate-900">
                  Your roadmap is waiting
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Start solving coding problems
                  to build your learning roadmap.
                </p>
              </div>
            ) : (
              <section>
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-slate-900">
                    Learning Topics
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Track your progress across
                    important technical topics.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {roadmap.topics.map(
                    (topic) => (
                      <RoadmapTopicCard
                        key={topic.topic}
                        topic={topic}
                      />
                    )
                  )}
                </div>
              </section>
            )}
          </>
        )}
    </div>
  );
}

export default Roadmap;