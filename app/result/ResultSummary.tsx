"use client";
import React from "react";

interface ResultSummaryProps {
  fullText: string;
  userInput: string;
  startTime: number;
  endTime: number;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({
  fullText,
  userInput,
  startTime,
  endTime,
}) => {
  const durationSec = (endTime - startTime) / 1000;
  const wordCount = fullText.trim().split(/\s+/).length;
  const wpm = Math.round((wordCount / durationSec) * 60);
  const correctChars = userInput
    .split("")
    .filter((c, i) => c === fullText[i]).length;
  const accuracy = Math.round((correctChars / fullText.length) * 100);
  const typoCount = fullText.length - correctChars;

  return (
    <div className="mt-6 p-4 border rounded-xl bg-white dark:bg-zinc-800 text-center shadow">
      <h2 className="text-2xl font-bold mb-4">결과</h2>
      <p>⏱ 소요 시간: {durationSec.toFixed(2)}초</p>
      <p>🔤 WPM: {wpm}</p>
      <p>🎯 정확도: {accuracy}%</p>
      <p>❌ 오타 수: {typoCount}</p>
    </div>
  );
};

export default ResultSummary;
