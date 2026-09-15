import ApplicationCard from "../../components/applications/ApplicationCard";
import { useApplications } from "../../hooks/useApplications";

function Applications() {
  const {
    data: applications,
    isLoading,
    isError,
    refetch,
  } = useApplications();

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-indigo-600">
          Career Journey
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          My Applications
        </h1>

        <p className="mt-2 text-slate-500">
          Track the progress of your job
          applications in one place.
        </p>
      </section>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
          <h2 className="text-lg font-bold text-slate-900">
            Unable to load applications
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Please try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white"
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
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                <h2 className="text-xl font-bold text-slate-900">
                  No applications yet
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Start exploring jobs and apply
                  for positions that match your
                  skills.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
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