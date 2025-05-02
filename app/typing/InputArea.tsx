"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingArea from "./TypingArea";

const fullText = `안녕하세요, 여기는 타이핑 연습하는 서비스를 제공하는 웹 사이트입니다.`;

export default function InputArea() {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null); // ✅ 추가
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (value.length === fullText.length && startTime !== null) {
      const finishedTime = Date.now();
      const durationSec = (finishedTime - startTime) / 1000;
      const correctChars = value
        .split("")
        .filter((c, i) => c === fullText[i]).length;
      const accuracy = Math.round((correctChars / fullText.length) * 100);
      const wordCount = fullText.trim().split(/\s+/).length;
      const wpm = Math.round((wordCount / durationSec) * 60);
      const typoCount = fullText.length - correctChars;

      // ✅ 결과를 localStorage에 저장
      localStorage.setItem(
        "typingResult",
        JSON.stringify({ durationSec, wpm, accuracy, typoCount })
      );

      router.push("/result");
    }
  };

  return (
    <div
      className="relative w-full max-w-4xl cursor-text"
      onClick={handleClick}
    >
      <TypingArea fullText={fullText} userInput={userInput} />
      <input
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        className="absolute top-0 left-0 w-full h-full opacity-0"
        autoFocus
      />
    </div>
  );
}
