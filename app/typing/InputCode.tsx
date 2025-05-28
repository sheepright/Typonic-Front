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
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setUserInput("");
    setStartTime(null);
  }, [fullText]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const percent = (userInput.length / fullText.length) * 100;
    setGage(percent);
  }, [userInput, setGage, fullText]);

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

    if (value.length === fullText.length && startTime !== null) {
      const finishedTime = Date.now();
      const durationSec = (finishedTime - startTime) / 1000;
      const correctChars = value
        .split("")
        .filter((c, i) => c === fullText[i]).length;
      const accuracy = Math.round((correctChars / fullText.length) * 100);
      const wordCount = fullText.trim().split(/\s+/).length;
      const wpm = Math.round((wordCount / durationSec) * 60 * 5);
      const typoCount = fullText.length - correctChars;

      const accuracyTimeline = fullText
        .split("")
        .map((char, i) =>
          value[i] === undefined ? null : value[i] === char ? 1 : 0
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
