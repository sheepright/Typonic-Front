"use client";

interface Result {
  durationSec: number;
  wpm: number;
  accuracy: number;
  typoCount: number;
  accuracyTimeline: (number | null)[];
}

interface PostRankProps {
  result: Result;
}

export default function PostRank({ result }: PostRankProps) {
  return (
    <div className="text-white mt-4">
      🏆 랭킹 등록 준비 중...
    </div>
  );
}
