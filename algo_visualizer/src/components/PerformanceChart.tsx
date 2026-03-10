import type { BenchmarkResult } from "../algos/runner";
import type SortAlgorithm from "../algos/SortAlgorithm";
import "../styles/ResultChart.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export type PerformanceChartProps = {
  data: BenchmarkResult[];
  algos: SortAlgorithm[];
};

const PerformanceChart = ({ data, algos }: PerformanceChartProps) => {
  return (
    <div className="chartContainer">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="n" label={{ value: "Array Size (n)", position: "insideBottom", offset: -5 }} />
          <YAxis
            scale="auto" // Change to "log" if the gap between Bubble and Quick is too massive
            domain={["auto", "auto"]}
            label={{ value: "Time (ms)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          {/* Dynamically create a line for each selected algorithm */}
          {algos.map((algo) => (
            <Line key={algo.name} type="monotone" dataKey={algo.name} stroke={algo.chartColor} strokeWidth={2} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
