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

interface AccuracyPoint {
  timeSec: number;
  wpm: number;
  accuracy: number;
}

interface ChartProps {
  timeline: AccuracyPoint[];
  durationSec: number;
}

export default function Chart({ timeline = [], durationSec }: ChartProps) {
  if (timeline.length === 0) return null;

  const maxTypingSpeed = Math.max(...timeline.map((p) => p.wpm), 100);

  const data = timeline.map((point) => ({
    time: point.timeSec,
    typingSpeed: point.wpm,
  }));

  return (
    <div className="mt-8 bg-[#2C2E31] p-4 rounded">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <XAxis
            type="number"
            dataKey="time"
            domain={[0, durationSec]}
            label={{ value: "시간 (초)", position: "insideBottom", offset: -5 }}
            tick={{ fill: "#ffffff" }}
          />
          <YAxis
            type="number"
            domain={[0, maxTypingSpeed]}
            label={{ value: "타수 (wpm)", angle: -90, position: "insideLeft" }}
            tick={{ fill: "#ffffff" }}
          />
          <Tooltip
            formatter={(value: any) => `${value}`}
          />
          <Line
            type="monotone"
            dataKey="typingSpeed"
            stroke="#4ade80"
            dot={false}
            name="타수"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
