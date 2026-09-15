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
        "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    },

    SHORTLISTED: {
      label: "Shortlisted",
      className:
        "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    },

    INTERVIEW: {
      label: "Interview",
      className:
        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    },

    SELECTED: {
      label: "Selected",
      className:
        "bg-green-500/10 text-green-400 border border-green-500/20",
    },

    REJECTED: {
      label: "Rejected",
      className:
        "bg-red-500/10 text-red-400 border border-red-500/20",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default ApplicationStatusBadge;