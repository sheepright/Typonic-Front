"use client";
import React, { useEffect, useState } from "react";
import TypingArea from "../typing/TypingArea";

const dummyWords = [
  "Int",
  "Char",
  "Float",
  "Double",
  "If",
  "Else",
  "For",
  "Switch",
  "Return",
  "Break",
];

const MAX_VISIBLE = 7;

export default function Word() {
  const [words, setWords] = useState(dummyWords);
  const [currentInput, setCurrentInput] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
    const currentWord = words[startIndex];
    if (!currentWord) return;

    if (e.key === "Backspace") {
      setCurrentInput((prev) => prev.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      const nextInput = currentInput + e.key;
      setCurrentInput(nextInput);

      if (nextInput === currentWord) {
        const updated = [...words];
        updated.splice(startIndex, 1);
        setWords(updated);
        setCurrentInput("");

        setStartIndex((prev) =>
          prev >= updated.length - MAX_VISIBLE ? prev : prev
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput, words, startIndex]);

  const currentWord = words[startIndex];
  const remainingWords = words.slice(startIndex + 1, startIndex + MAX_VISIBLE);

  return (
    <div className="w-full h-screen bg-[#323437] flex flex-col items-center justify-center gap-10">
      {/* 현재 입력 단어 표시 */}
      {currentWord && (
        <div className="bg-[#2C2E31] px-8 py-4 rounded shadow text-white font-mono text-2xl text-center min-w-[120px]">
          <TypingArea fullText={currentWord} userInput={currentInput} />
        </div>
      )}

      {/* 아래에 남은 단어들 표시 */}
      <div className="flex gap-4 px-4 flex-wrap justify-center">
        {remainingWords.map((word, idx) => (
          <div
            key={startIndex + idx + 1}
            className="bg-[#2C2E31] px-4 py-2 rounded shadow text-white font-mono text-lg min-w-[80px] text-center"
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
