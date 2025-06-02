"use client";

import { getTierInfo } from "../../utils/getTierInfo";

interface AccuracyPoint {
  timeSec: number;
  wpm: number;
  accuracy: number;
}

interface TierProps {
  result: {
    durationSec: number;
    wpm: number;
    accuracy: number;
    typoCount: number;
    accuracyTimeline: AccuracyPoint[];
    savedAt: string;
  };
}

export default function Tier({ result }: TierProps) {
  const { wpm } = result;
  const { tier, tierImg, speedRange, stars } = getTierInfo(wpm);

  // tier에 따라 이미지 경로 지정
  const imagePath = `/images/tier/${tierImg}.png`;

  return (
    <div className="w-[880px] font-paper opacity-80 relative">
      <p className="text-[25px]">당신의 타이핑 속도는?</p>
      <p className="text-[40px]">타수 : {wpm}</p>

      <div className="flex justify-between">
        {/* 왼쪽 이미지 */}
        <div>
          <img
            src={imagePath}
            alt={tierImg}
            className="w-[512px] h-[512px] absolute top-10 left-20"
          />
        </div>

        {/* 오른쪽 티어 정보 */}
        <div className="flex flex-col">
          <p className="text-[40px]">
            <span>{tier}</span>
          </p>
          <p className="text-[25px]">{speedRange}</p>
          <div className="flex">
            {Array.from({ length: stars }).map((_, i) => (
              <span key={i} className="text-yellow-400 text-[25px]">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
