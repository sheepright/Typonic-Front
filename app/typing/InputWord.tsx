"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingWord from "./TypingWord";

interface TypingWordsInputProps {
  setGage: (value: number) => void;
  words: string[];
}

export default function InputWord({ setGage, words }: TypingWordsInputProps) {
  const [userInput, setUserInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracyTimeline, setAccuracyTimeline] = useState<
    { timeSec: number; wpm: number; accuracy: number; typoCount: number }[]
  >([]);
  const [isComposing, setIsComposing] = useState(false);
  const [totalTypos, setTotalTypos] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    setUserInput("");
    setCurrentWordIndex(0);
    setStartTime(null);
    setAccuracyTimeline([]);
  }, [words]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const moveToNextWord = (finalInput: string) => {
    const currentWord = words[currentWordIndex] || "";

    const correctChars = finalInput
      .split("")
      .filter((c, i) => c === currentWord[i]).length;

    const typoInThisWord = currentWord.length - correctChars;

    const totalLength =
      words.slice(0, currentWordIndex).join("").length + currentWord.length;

    const updatedTotalTypos = totalTypos + typoInThisWord;

    const overallAccuracy =
      totalLength > 0
        ? Math.round(((totalLength - updatedTotalTypos) / totalLength) * 100)
        : 100;

    const endTime = Date.now();
    const durationSec = startTime !== null ? (endTime - startTime) / 1000 : 0;

    const wpmRaw = (totalLength / durationSec) * 60;
    const wpm = isFinite(wpmRaw)
      ? Math.floor((Math.round(wpmRaw * 1.5) * overallAccuracy) / 100)
      : 0;

    const timelineEntry = {
      timeSec: durationSec,
      wpm,
      accuracy: overallAccuracy,
      typoCount: updatedTotalTypos,
    };

    const updatedTimeline = [...accuracyTimeline, timelineEntry];
    setAccuracyTimeline(updatedTimeline);
    setTotalTypos(updatedTotalTypos);

    if (currentWordIndex + 1 >= words.length) {
      localStorage.setItem(
        "typingResult",
        JSON.stringify({
          durationSec,
          wpm,
          classification: 1,
          accuracy: overallAccuracy,
          typoCount: updatedTotalTypos,
          totalChars: totalLength,
          accuracyTimeline: updatedTimeline,
          savedAt: new Date().toISOString(),
        })
      );
      router.push("/result");
    } else {
      setUserInput("");
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const currentWord = words[currentWordIndex] || "";

    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    const finalValue = value.slice(0, currentWord.length);
    setUserInput(finalValue);

    const typedChars =
      words.slice(0, currentWordIndex).join(" ").length + finalValue.length;
    const totalLength = words.join(" ").length;
    setGage((typedChars / totalLength) * 100);
  };

  const lastEnterTimeRef = useRef<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const now = Date.now();
    if (e.key === "Enter" && !isComposing) {
      e.preventDefault();

      if (now - lastEnterTimeRef.current < 100) {
        return;
      }

      lastEnterTimeRef.current = now;

      const currentWord = words[currentWordIndex] || "";
      const finalValue = userInput.slice(0, currentWord.length);
      moveToNextWord(finalValue);
    }
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => {
    setIsComposing(false);
    const value = e.currentTarget.value;
    const currentWord = words[currentWordIndex] || "";
    const finalValue = value.slice(0, currentWord.length);
    setUserInput(finalValue);

    const typedChars =
      words.slice(0, currentWordIndex).join(" ").length + finalValue.length;
    const totalLength = words.join(" ").length;
    setGage((typedChars / totalLength) * 100);
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      key={currentWordIndex}
      className="relative w-full h-full cursor-text"
      onClick={handleClick}
    >
      <TypingWord
        words={words}
        currentWordIndex={currentWordIndex}
        currentInput={userInput}
      />
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={handleCompositionEnd}
        className="absolute inset-0 w-full h-full opacity-0 resize-none"
        autoFocus
      />
    </div>
  );
}
