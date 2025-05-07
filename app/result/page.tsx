"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Chart from "./Chart";

interface Result {
  durationSec: number;
  wpm: number;
  accuracy: number;
  typoCount: number;
  accuracyTimeline: (number | null)[];
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("typingResult");
    if (!data) {
      router.replace("/");
      return;
    }

    try {
      const parsed: Result = JSON.parse(data);
      setResult(parsed);
    } catch (e) {
      router.replace("/");
    }
  }, [router]);

  if (!result) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="p-6 border rounded-xl bg-white dark:bg-zinc-800 shadow text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">타이핑 결과</h1>
        <p>⏱ 소요 시간: {result.durationSec.toFixed(2)}초</p>
        <p>🔤 WPM: {result.wpm}</p>
        <p>🎯 정확도: {result.accuracy}%</p>
        <p>❌ 오타 수: {result.typoCount}</p>
        <Chart timeline={result.accuracyTimeline} />
      </div>
    </div>
  );
}
