import type {
  RecruiterApplicationStatus,
} from "../../api/recruiterApplication.api";

interface ApplicantFiltersProps {
  status: RecruiterApplicationStatus | "ALL";
  onStatusChange: (
    status: RecruiterApplicationStatus | "ALL"
  ) => void;
}

function ApplicantFilters({
  status,
  onStatusChange,
}: ApplicantFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h3 className="font-semibold text-slate-900">
          Applicants
        </h3>

        <p className="text-sm text-slate-500">
          Filter applicants by application status.
        </p>
      </div>

      <select
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value as
              | RecruiterApplicationStatus
              | "ALL"
          )
        }
        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500"
      >
        <option value="ALL">
          All Applicants
        </option>

        <option value="APPLIED">
          Applied
        </option>

        <option value="SHORTLISTED">
          Shortlisted
        </option>

        <option value="INTERVIEW">
          Interview
        </option>

        <option value="SELECTED">
          Selected
        </option>

        <option value="REJECTED">
          Rejected
        </option>
      </select>
    </div>
  );
}

export default ApplicantFilters;