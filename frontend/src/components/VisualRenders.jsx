import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

export default function VisualRenderer({ visuals }) {
  if (!visuals) return null;

  return (
    <div className="mt-4 space-y-6">
      {Object.entries(visuals).map(([key, chart]) => (
        <ChartBlock key={key} chart={chart} />
      ))}
    </div>
  );
}

function ChartBlock({ chart }) {
  const data = chart.labels.map((label, i) => ({
    name: label,
    value: chart.values[i]
  }));

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
      <div className="text-sm font-semibold mb-2">{chart.title}</div>

      {chart.type === "bar" && chart.labels.length > 0&& (
        <BarChart width={320} height={220} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      )}

      {chart.type === "pie" && chart.labels.length > 0 && (
        <PieChart width={320} height={220}>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} />
          <Tooltip />
        </PieChart>
      )}

      {chart.type === "radar" && chart.labels.length > 0 && (
        <RadarChart width={320} height={220} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar dataKey="value" />
          <Tooltip />
        </RadarChart>
      )}

      <p className="text-xs text-slate-400 mt-2">{chart.explanation}</p>
    </div>
  );
}
