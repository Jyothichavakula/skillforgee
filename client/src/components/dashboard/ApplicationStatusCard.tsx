interface ApplicationStatusCardProps {
  applied: number;
  shortlisted: number;
  interviews: number;
  selected: number;
  rejected: number;
}

const statuses = [
  {
    key: "applied",
    label: "Applied",
  },
  {
    key: "shortlisted",
    label: "Shortlisted",
  },
  {
    key: "interviews",
    label: "Interviews",
  },
  {
    key: "selected",
    label: "Selected",
  },
  {
    key: "rejected",
    label: "Rejected",
  },
] as const;

function ApplicationStatusCard({
  applied,
  shortlisted,
  interviews,
  selected,
  rejected,
}: ApplicationStatusCardProps) {
  const values = {
    applied,
    shortlisted,
    interviews,
    selected,
    rejected,
  };

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Application Overview
        </h2>

        <p className="mt-1 text-sm text-neutral-400">
          Track the current status of your job applications.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statuses.map((status) => (
          <div
            key={status.key}
            className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 transition hover:border-yellow-400/30"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              {status.label}
            </p>

            <p className="mt-1.5 text-2xl font-bold text-yellow-400">
              {values[status.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationStatusCard;