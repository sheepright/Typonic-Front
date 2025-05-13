"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingArea from "./TypingArea";

const fullText = `#include <studio.h>
int main() {
\tprintf("Hello, Typonic!\\n");
\treturn 0;
}`;

export default function InputArea() {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null); // ✅ textarea로 변경

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    inputRef.current?.focus();
  };

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
      const wpm = Math.round((wordCount / durationSec) * 60);
      const typoCount = fullText.length - correctChars;

      localStorage.setItem(
        "typingResult",
        JSON.stringify({ durationSec, wpm, accuracy, typoCount })
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

      // 커서 위치 갱신
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div className="relative w-full h-full cursor-text" onClick={handleClick}>
      <TypingArea fullText={fullText} userInput={userInput} />

      {/* textarea 입력창 */}
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown} // ✅ 탭 키 입력 처리
        className="absolute top-0 left-0 w-full h-full opacity-0 resize-none"
        autoFocus
      />
    </div>
  );
}
