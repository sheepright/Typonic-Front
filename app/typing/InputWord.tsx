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
    const typo = finalInput.length - correctChars;

    const typedLength =
      words.slice(0, currentWordIndex).join(" ").length + currentWord.length;
    const totalLength = words.join(" ").length;

    const endTime = Date.now();
    const durationSec = startTime !== null ? (endTime - startTime) / 1000 : 0;
    const typedWordsCount =
      words.slice(0, currentWordIndex).join(" ").split(/\s+/).filter(Boolean)
        .length + 1;

    const wpmRaw = (typedWordsCount / durationSec) * 60;
    const wpm = isFinite(wpmRaw) ? Math.round(wpmRaw) : 0;
    const accuracy = Math.round((correctChars / currentWord.length) * 100);

    const timelineEntry = {
      timeSec: durationSec,
      wpm,
      accuracy,
      typoCount: typo,
    };

    const updatedTimeline = [...accuracyTimeline, timelineEntry];
    setAccuracyTimeline(updatedTimeline);

    if (currentWordIndex + 1 >= words.length) {
      localStorage.setItem(
        "typingResult",
        JSON.stringify({
          durationSec,
          wpm,
          accuracy,
          typoCount: typo,
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

    // 단어 길이만큼만 입력 허용
    const finalValue = value.slice(0, currentWord.length);
    setUserInput(finalValue);

    // 게이지 업데이트
    const typedChars =
      words.slice(0, currentWordIndex).join(" ").length + finalValue.length;
    const totalLength = words.join(" ").length;
    setGage((typedChars / totalLength) * 100);

    // 한글/영문 상관없이, 조합 중 아니고 단어 완성되면 다음으로 이동
    if (!isComposing && finalValue === currentWord) {
      moveToNextWord(finalValue);
    }
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLTextAreaElement>
  ) => {
    setIsComposing(false);
    const value = e.currentTarget.value;
    const currentWord = words[currentWordIndex] || "";

    // 단어 길이만큼만 입력 허용
    const finalValue = value.slice(0, currentWord.length);
    setUserInput(finalValue);

    // 게이지 업데이트
    const typedChars =
      words.slice(0, currentWordIndex).join(" ").length + finalValue.length;
    const totalLength = words.join(" ").length;
    setGage((typedChars / totalLength) * 100);

    // 한글 입력 완성 후 단어가 완성되면 다음으로 이동
    if (finalValue === currentWord) {
      moveToNextWord(finalValue);
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full h-full cursor-text" onClick={handleClick}>
      <TypingWord
        words={words}
        currentWordIndex={currentWordIndex}
        currentInput={userInput}
      />
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={handleCompositionEnd}
        className="absolute inset-0 w-full h-full opacity-0 resize-none"
        autoFocus
      />
    </div>
  );
}
