import type { ApplicationStatus } from "../../api/application.api";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  const statusConfig: Record<
    ApplicationStatus,
    {
      label: string;
      className: string;
    }
  > = {
    APPLIED: {
      label: "Applied",
      className:
        "bg-blue-50 text-blue-700",
    },

    SHORTLISTED: {
      label: "Shortlisted",
      className:
        "bg-purple-50 text-purple-700",
    },

    INTERVIEW: {
      label: "Interview",
      className:
        "bg-amber-50 text-amber-700",
    },

    SELECTED: {
      label: "Selected",
      className:
        "bg-green-50 text-green-700",
    },

    REJECTED: {
      label: "Rejected",
      className:
        "bg-red-50 text-red-700",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default ApplicationStatusBadge;