"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import TypingWord from "./TypingWord";

interface TypingWordsInputProps {
  setGage: (value: number) => void;
  words: string[];
}

export default function InputWord({ setGage, words }: TypingWordsInputProps) {
  const [userInput, setUserInput] = useState(""); // 현재 입력 중인 문자열
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // 현재 입력할 단어 인덱스
  const [startTime, setStartTime] = useState<number | null>(null); // 시작 시간
  const [accuracyTimeline, setAccuracyTimeline] = useState<(0 | 1)[]>([]); // 정확도 기록
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 중 여부

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  // 단어 리스트가 바뀌면 초기화
  useEffect(() => {
    setUserInput("");
    setCurrentWordIndex(0);
    setStartTime(null);
    setAccuracyTimeline([]);
  }, [words]);

  // textarea 자동 포커싱
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 다음 단어로 넘어가는 처리
  const moveToNextWord = () => {
    const currentWord = words[currentWordIndex] || "";

    // 현재 입력과 정답 비교 (글자 단위 정확도)
    const result = userInput
      .split("")
      .map((char, idx) => (char === currentWord[idx] ? 1 : 0)) as (0 | 1)[];

    const updatedTimeline = [...accuracyTimeline, ...result];
    setAccuracyTimeline(updatedTimeline);

    // 게이지 계산
    const typedLength =
      words.slice(0, currentWordIndex).join("").length + currentWord.length;
    const totalLength = words.join("").length;
    setGage((typedLength / totalLength) * 100);

    // 입력 초기화 및 다음 단어 인덱스로 이동
    setUserInput("");
    setCurrentWordIndex((prev) => prev + 1);

    // 모든 단어를 다 입력한 경우 결과 저장
    if (currentWordIndex + 1 >= words.length && startTime !== null) {
      const endTime = Date.now();
      const durationSec = (endTime - startTime) / 1000;

      const correct = updatedTimeline.filter((v) => v === 1).length;
      const typo = updatedTimeline.filter((v) => v === 0).length;
      const total = updatedTimeline.length;
      const accuracy = total ? Math.round((correct / total) * 100) : 0;
      const wpm = Math.round(((words.length * 5) / durationSec) * 60);

      localStorage.setItem(
        "typingResult",
        JSON.stringify({
          durationSec,
          wpm,
          accuracy,
          typoCount: typo,
          accuracyTimeline: updatedTimeline,
          savedAt: new Date().toISOString(),
        })
      );

      router.push("/result");
    }
  };

  // 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isComposing) {
      setUserInput(e.target.value);
      return;
    }

    const value = e.target.value;
    const currentWord = words[currentWordIndex] || "";

    // 입력이 시작되면 시작 시간 기록
    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    // 입력이 단어 길이를 넘으면 자동으로 다음 단어로 이동
    if (value.length >= currentWord.length) {
      moveToNextWord();
    }
  };

  // 스페이스바로 단어 넘기기
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      moveToNextWord();
    }
  };

  // 클릭 시 입력창 포커싱
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
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="absolute inset-0 w-full h-full opacity-0 resize-none"
        autoFocus
      />
    </div>
  );
}
