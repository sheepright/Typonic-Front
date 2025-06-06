"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingArea from "./TypingCode";

interface InputAreaProps {
  setGage: (value: number) => void;
  fullText: string;
  clicked: boolean;
}

export default function InputArea({
  setGage,
  fullText,
  clicked,
}: InputAreaProps) {
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
    setAccuracyTimeline([]);
  }, [fullText]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const percent = (userInput.length / fullText.length) * 100;
    setGage(percent);
  }, [fullText, userInput, setGage]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length === 1 && !startTime) {
      setStartTime(Date.now());
      // 정확도 100으로 시작
      setAccuracyTimeline([
        {
          timeSec: 0,
          wpm: 0,
          accuracy: 100,
          typoCount: 0,
        },
      ]);
    }

    if (value.length < userInput.length) {
      const isAccurate = userInput === fullText.slice(0, userInput.length);
      if (isAccurate) return;
      setUserInput(value);
      return;
    }

    if (value.length <= fullText.length) {
      const nextChar = fullText[value.length];
      if (nextChar === "\t" && clicked) {
        let tabCount = 0;
        for (let i = value.length; i < fullText.length; i++) {
          if (fullText[i] === "\t") {
            tabCount++;
          } else {
            break;
          }
        }

        const tabsToInsert = "\t".repeat(tabCount);
        setUserInput(value + tabsToInsert);
        return;
      }

      setUserInput(value);
    }

    if (startTime !== null) {
      const elapsedSec = (Date.now() - startTime) / 1000;

      if (elapsedSec > 0.1) {
        const correctChars = value
          .split("")
          .filter((c, i) => c === fullText[i]).length;
        const typoCount = value.length - correctChars;

        // 정확도: 오타 비례로 감소, 100% 시작
        const currentAccuracy = Math.max(
          100 - Math.round((typoCount / fullText.length) * 100),
          0
        );

        const typedWordCount = value.replace(/\s/g, "").length;
        const currentWpmRaw = (typedWordCount / elapsedSec) * 60;
        const currentWpm = isFinite(currentWpmRaw)
          ? Math.floor(
              (Math.round(currentWpmRaw * 1.5) * currentAccuracy) / 100
            )
          : 0;

        console.log(typedWordCount);

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

      // ✅ 최종 정확도 계산도 오타 기반 감소 방식
      const accuracy = Math.max(
        100 - Math.round((typoCount / fullText.length) * 100),
        0
      );

      const typedWordCount = value.replace(/\s/g, "").length;
      const wpmRaw = (typedWordCount / durationSec) * 60;
      const wpm = isFinite(wpmRaw)
        ? Math.floor((Math.round(wpmRaw * 1.5) * accuracy) / 100)
        : 0;

      localStorage.setItem(
        "typingResult",
        JSON.stringify({
          durationSec,
          wpm,
          classification: 0,
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
