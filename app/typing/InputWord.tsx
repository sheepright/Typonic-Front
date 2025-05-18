"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TypingWord from "./TypingWord";

interface TypingWordsInputProps {
  setGage: (value: number) => void;
}

const initialWords: string[] = [
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
  "Container",
  "JavaScript",
];

const WORDS_PER_SCREEN = 7;
const INPUT_WORD_INDEX = 3;

export default function InputWord({ setGage }: TypingWordsInputProps) {
  const [words, setWords] = useState<string[]>(initialWords);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [inputMode, setInputMode] = useState<"initial" | "fixed">("initial");
  const [inputPosition, setInputPosition] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalInput, setTotalInput] = useState<string>("");

  const router = useRouter();
  const totalLength = words.join("").length;
  const currentWord = words[currentWordIndex] ?? "";

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!currentWord) return;

    if (e.key === "Backspace") {
      if (currentInput.length === 0) return;

      const lastIndex = currentInput.length - 1;
      const typedChar = currentInput[lastIndex];
      const correctChar = currentWord[lastIndex];

      const isCorrect = typedChar === correctChar;

      // 정답으로 입력된 문자는 삭제 금지
      if (isCorrect) return;

      // 오타는 삭제 허용
      setCurrentInput((prev) => prev.slice(0, -1));
      setTotalInput((prev) => prev.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      if (!startTime) setStartTime(Date.now());

      const nextInput = currentInput + e.key;
      setCurrentInput(nextInput);
      setTotalInput((prev) => prev + e.key);

      const typedTotal =
        words.slice(0, currentWordIndex).join("").length + nextInput.length;
      const percent = (typedTotal / totalLength) * 100;
      setGage(percent);

      if (nextInput.length >= currentWord.length) {
        setCurrentInput("");
        const nextWordIndex = currentWordIndex + 1;
        setCurrentWordIndex(nextWordIndex);

        if (inputMode === "initial") {
          if (inputPosition < INPUT_WORD_INDEX) {
            setInputPosition((pos) => pos + 1);
          } else {
            setInputMode("fixed");
          }
        }

        if (nextWordIndex >= words.length && startTime) {
          const endTime = Date.now();
          const durationSec = (endTime - startTime) / 1000;
          const fullText = words.join("");
          const userText = totalInput;

          const correctChars = fullText
            .split("")
            .filter((c, i) => userText[i] === c).length;
          const accuracy = Math.round((correctChars / fullText.length) * 100);
          const wordCount = words.length;
          const wpm = Math.round((wordCount / durationSec) * 60 * 5);
          const typoCount = fullText.length - correctChars;

          const accuracyTimeline = fullText
            .split("")
            .map((char, i) =>
              userText[i] === undefined ? null : userText[i] === char ? 1 : 0
            );

          localStorage.setItem(
            "typingResult",
            JSON.stringify({
              durationSec,
              wpm,
              accuracy,
              typoCount,
              accuracyTimeline,
            })
          );

          router.push("/result");
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput, currentWordIndex, inputMode, inputPosition, totalInput]);

  return (
    <TypingWord
      words={words}
      currentWordIndex={currentWordIndex}
      currentInput={currentInput}
      inputMode={inputMode}
      inputPosition={inputPosition}
    />
  );
}
