import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ApplicationStatusChartProps {
  applied: number;
  shortlisted: number;
  interview: number;
  selected: number;
  rejected: number;
}

const ApplicationStatusChart = ({
  applied,
  shortlisted,
  interview,
  selected,
  rejected,
}: ApplicationStatusChartProps) => {
  const data = [
    { name: "Applied", value: applied, color: "#eab308" }, // yellow-500
    { name: "Shortlisted", value: shortlisted, color: "#60a5fa" }, // blue-400
    { name: "Interview", value: interview, color: "#c084fc" }, // purple-400
    { name: "Selected", value: selected, color: "#22c55e" }, // green-500
    { name: "Rejected", value: rejected, color: "#ef4444" }, // red-500
  ].filter((item) => item.value > 0);

  return (
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <h2 className="text-xl font-bold text-white">
        Application Status
      </h2>

      <p className="mt-1 text-sm text-neutral-400">
        Distribution of your applications
      </p>

      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm font-bold text-neutral-600">
          No application data available.
        </div>
      ) : (
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid #333",
                  borderRadius: "12px",
                  color: "#fff",
                  fontWeight: "bold",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-300"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationStatusChart;