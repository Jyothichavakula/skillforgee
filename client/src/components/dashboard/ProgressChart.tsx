import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressChartProps {
  solved: number;
  attempted: number;
  total: number;
}

function ProgressChart({
  solved,
  attempted,
  total,
}: ProgressChartProps) {
  const remaining = Math.max(
    total - solved,
    0
  );

  const data = [
    {
      name: "Solved",
      value: solved,
    },
    {
      name: "Attempted",
      value: Math.max(
        attempted - solved,
        0
      ),
    },
    {
      name: "Remaining",
      value: remaining,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Coding Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Breakdown of your coding practice.
        </p>
      </div>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(99, 102, 241, 0.05)",
              }}
            />

            <Bar
              dataKey="value"
              radius={[
                6,
                6,
                0,
                0,
              ]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;