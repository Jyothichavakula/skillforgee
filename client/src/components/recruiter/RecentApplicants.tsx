import type { RecruiterApplicant } from "../../api/recruiter.api";

interface RecentApplicantsProps {
  applicants: RecruiterApplicant[];
}

function RecentApplicants({
  applicants,
}: RecentApplicantsProps) {
  const getInitials = (
    firstName?: string,
    lastName?: string
  ) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Applicants
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest applications received for your jobs.
        </p>
      </div>

      {applicants.length === 0 ? (
        <div className="p-8 text-center text-sm text-slate-400">
          No applications yet.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {applicants.map((application) => {
            const student = application.studentId;

            return (
              <div
                key={application._id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                    {getInitials(
                      student?.firstName,
                      student?.lastName
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {student?.firstName || "Unknown"}{" "}
                      {student?.lastName || ""}
                    </p>

                    <p className="text-xs text-slate-400">
                      {application.jobId?.title ||
                        "Job"}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    application.status === "SELECTED"
                      ? "bg-emerald-50 text-emerald-600"
                      : application.status === "REJECTED"
                      ? "bg-red-50 text-red-600"
                      : application.status ===
                        "INTERVIEW"
                      ? "bg-purple-50 text-purple-600"
                      : application.status ===
                        "SHORTLISTED"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {application.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RecentApplicants;