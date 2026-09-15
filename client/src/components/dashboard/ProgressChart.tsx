import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ProgressChartProps {
  solved: number;
  attempted: number;
  total: number;
}

const BAR_COLORS = ["#facc15", "#eab308", "#3f3f46"];

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
    <div className="rounded-2xl border border-neutral-800/90 bg-[#121215] p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Coding Overview
        </h2>

        <p className="mt-1 text-sm text-neutral-400">
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
              stroke="#27272a"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
                fill: "#a1a1aa",
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 12,
                fill: "#a1a1aa",
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                borderColor: "#3f3f46",
                borderRadius: "0.75rem",
                color: "#ffffff",
              }}
              itemStyle={{ color: "#facc15" }}
              cursor={{
                fill: "rgba(250, 204, 21, 0.05)",
              }}
            />

            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;