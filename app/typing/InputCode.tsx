"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingArea from "./TypingCode";

interface InputAreaProps {
  setGage: (value: number) => void;
  fullText: string;
}

export default function InputArea({ setGage, fullText }: InputAreaProps) {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [accuracyTimeline, setAccuracyTimeline] = useState<
    { timeSec: number; wpm: number; accuracy: number; typoCount: number }[]
  >([]);
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setUserInput("");
    setStartTime(null);
    setAccuracyTimeline([]); // fullText가 바뀔 때도 타임라인 초기화!
  }, [fullText]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const percent = (userInput.length / fullText.length) * 100;
    setGage(percent);
  }, [userInput, setGage]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length === 1 && !startTime) setStartTime(Date.now());

    if (value.length < userInput.length) {
      const isAccurate = userInput === fullText.slice(0, userInput.length);
      if (isAccurate) return;
      setUserInput(value);
      return;
    }

    if (value.length <= fullText.length) {
      setUserInput(value);
    }

    if (startTime !== null) {
      const elapsedSec = (Date.now() - startTime) / 1000;

      if (elapsedSec > 0.1) {
        const correctChars = value
          .split("")
          .filter((c, i) => c === fullText[i]).length;
        const typoCount = value.length - correctChars;

        const typedWordCount = value.trim().split(/\s+/).filter(Boolean).length;
        const currentWpmRaw = (typedWordCount / elapsedSec) * 60;
        const currentWpm = isFinite(currentWpmRaw)
          ? Math.round(currentWpmRaw)
          : 0;

        const currentAccuracy = Math.round(
          (correctChars / fullText.length) * 100
        );

        setAccuracyTimeline((prev) => [
          ...prev,
          {
            timeSec: elapsedSec,
            wpm: currentWpm,
            accuracy: currentAccuracy,
            typoCount,
          },
        ]);
      }
    }

    if (value.length === fullText.length && startTime !== null) {
      const finishedTime = Date.now();
      const durationSec = (finishedTime - startTime) / 1000;
      const correctChars = value
        .split("")
        .filter((c, i) => c === fullText[i]).length;
      const typoCount = value.length - correctChars;

      const typedWordCount = value.trim().split(/\s+/).filter(Boolean).length;
      const wpmRaw = (typedWordCount / durationSec) * 60;
      const wpm = isFinite(wpmRaw) ? Math.round(wpmRaw) : 0;

      const accuracy = Math.round((correctChars / fullText.length) * 100);

      localStorage.setItem(
        "typingResult",
        JSON.stringify({
          durationSec,
          wpm,
          accuracy,
          typoCount,
          totalChars: fullText.length,
          accuracyTimeline,
          savedAt: new Date().toISOString(),
        })
      );

      router.push("/result");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = inputRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue =
        userInput.substring(0, start) + "\t" + userInput.substring(end);
      setUserInput(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full h-full cursor-text" onClick={handleClick}>
      <TypingArea fullText={fullText} userInput={userInput} />
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="absolute top-0 left-0 w-full h-full opacity-0 resize-none"
        autoFocus
      />
    </div>
  );
}
