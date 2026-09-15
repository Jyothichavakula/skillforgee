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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Application Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track the current status of your job
          applications.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {statuses.map((status) => (
          <div
            key={status.key}
            className="rounded-xl bg-slate-50 p-4"
          >
            <p className="text-xs text-slate-500">
              {status.label}
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {values[status.key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationStatusCard;