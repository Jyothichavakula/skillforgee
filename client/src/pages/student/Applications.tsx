import ApplicationCard from "../../components/applications/ApplicationCard";
import { useApplications } from "../../hooks/useApplications";
import { Briefcase } from "lucide-react";

function Applications() {
  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useApplications();

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 pb-20 md:p-6 lg:p-8">
      {/* Header */}
      <section className="border-b border-neutral-800 pb-6">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-500 mb-2">
          <Briefcase className="h-4 w-4" />
          Career Journey
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          My Applications
        </h1>

        <p className="mt-2 text-lg text-neutral-400">
          Track the progress of your job applications in one place.
        </p>
      </section>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-2xl bg-[#121215] border border-neutral-800/90 shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-2xl border border-red-500/20 bg-[#121215] p-10 text-center">
          <h2 className="text-xl font-bold text-white">
            Unable to load applications
          </h2>

          <p className="mt-2 text-sm text-neutral-400">
            Please try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 rounded-xl bg-yellow-500 px-6 py-2.5 text-sm font-extrabold text-black transition hover:bg-yellow-400"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Applications */}
      {!isLoading &&
        !isError &&
        applications && (
          <>
            {applications.length === 0 ? (
              <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  No applications yet
                </h2>

                <p className="mt-2 text-sm text-neutral-400">
                  Start exploring jobs and apply for positions that match your skills.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {applications.map(
                  (application) => (
                    <ApplicationCard
                      key={application._id}
                      application={application}
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

export default Applications;