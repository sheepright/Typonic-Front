"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartPoint {
  timeSec: number;
  wpm: number;
  typoCount: number;
  accuracy: number;
}

interface ChartProps {
  timeline: ChartPoint[];
  durationSec: number;
}

export default function Chart({ timeline, durationSec }: ChartProps) {
  if (timeline.length === 0) return null;

  // 0.5초 이후 데이터만 필터링
  const filteredTimeline = timeline.filter((point) => point.timeSec >= 1);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any;
    label?: string | number;
  }) => {
    if (active && payload && payload.length > 0) {
      const { wpm, accuracy, typoCount } = payload[0].payload;

      // 시간 값을 소수점 첫째자리까지만 표시
      const formattedLabel =
        typeof label === "number" ? label.toFixed(1) : label;

      return (
        <div className="bg-[#333] text-white p-2 rounded text-[14px] space-y-1">
          <p>시간: {formattedLabel} 초</p>
          <p>
            <span
              className="inline-block w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: "#A1E3D8" }}
            ></span>
            WPM: {wpm}
          </p>
          <p>
            <span
              className="inline-block w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: "#FFD972" }}
            ></span>
            정확도: {accuracy}%
          </p>
          <p>
            <span
              className="inline-block w-3 h-3 rounded-full mr-1"
              style={{ backgroundColor: "#FF9F9F" }}
            ></span>
            오타: {typoCount} 개
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={filteredTimeline}>
          <XAxis
            dataKey="timeSec"
            tick={false}
            label={undefined}
            stroke="#ffffff6e"
            strokeWidth={2}
          />
          <YAxis
            yAxisId="left"
            tick={false}
            label={undefined}
            stroke="#ffffff6e"
            strokeWidth={2}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="left"
            wrapperStyle={{
              marginLeft: "60px", // 40px만큼 오른쪽으로 이동
            }}
          />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey="wpm"
            stroke="#A1E3D8"
            strokeWidth={2}
            fill="#A1E3D8"
            fillOpacity={0.2}
            name="타수"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="typoCount"
            stroke="#FF9F9F"
            strokeWidth={2}
            fill="#FF9F9F"
            fillOpacity={0.2}
            name="오타"
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="accuracy"
            stroke="#FFD972"
            strokeWidth={2}
            fill="#FFD972"
            fillOpacity={0.2}
            name="정확도"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* 오른쪽 아래 "타수 / 시간" 레이블 */}
      <div className="absolute bottom-1 right-2 text-white text-[16px] font-bold">
        타수 / 시간
      </div>
    </div>
  );
}
