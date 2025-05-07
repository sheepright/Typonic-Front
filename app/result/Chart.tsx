"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  timeline: (number | null)[];
}

export default function Chart({ timeline }: ChartProps) {
  const data = timeline.map((val, idx) => ({
    index: idx + 1,
    accuracy: val !== null ? val * 100 : undefined,
  }));

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">입력 정확도 변화</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="index" hide />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(value: any) => `${value}%`} />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#4ade80"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
