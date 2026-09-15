import type {
  RecruiterApplicationStatus,
} from "../../api/recruiterApplication.api";

interface ApplicantStatusBadgeProps {
  status: RecruiterApplicationStatus;
}

function ApplicantStatusBadge({
  status,
}: ApplicantStatusBadgeProps) {
  const styles: Record<
    RecruiterApplicationStatus,
    string
  > = {
    APPLIED:
      "bg-blue-100 text-blue-700",

    SHORTLISTED:
      "bg-purple-100 text-purple-700",

    INTERVIEW:
      "bg-amber-100 text-amber-700",

    SELECTED:
      "bg-green-100 text-green-700",

    REJECTED:
      "bg-red-100 text-red-700",
  };

  const labels: Record<
    RecruiterApplicationStatus,
    string
  > = {
    APPLIED: "Applied",
    SHORTLISTED: "Shortlisted",
    INTERVIEW: "Interview",
    SELECTED: "Selected",
    REJECTED: "Rejected",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

export default ApplicantStatusBadge;