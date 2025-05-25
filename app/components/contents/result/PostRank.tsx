"use client";

interface AccuracyPoint {
  timeSec: number;
  wpm: number;
  accuracy: number;
}

interface PostRankProps {
  result: {
    durationSec: number;
    wpm: number;
    accuracy: number;
    typoCount: number;
    accuracyTimeline: AccuracyPoint[]; 
    savedAt: string;
  };
}


interface PostRankProps {
    result: {
    durationSec: number;
    wpm: number;
    accuracy: number;
    typoCount: number;
    accuracyTimeline: AccuracyPoint[];
    savedAt: string;
  };
}

export default function PostRank({ result }: PostRankProps) {
  return (
    <div className="text-white mt-4">
      🏆 랭킹 등록 준비 중...
    </div>
  );
}
