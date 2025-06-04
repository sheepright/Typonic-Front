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

  const typoInThisWord = finalInput
    .split("")
    .filter((c, i) => c !== currentWord[i]).length;

  const totalLength =
    words.slice(0, currentWordIndex).join("").length + finalInput.length;

  const updatedTotalTypos = totalTypos + typoInThisWord;

  const overallAccuracy =
    totalLength > 0
      ? Math.round(((totalLength - updatedTotalTypos) / totalLength) * 100)
      : 100;

  const endTime = Date.now();
  const durationSec = startTime !== null ? (endTime - startTime) / 1000 : 0;

  const wpmRaw = totalLength / durationSec * 60;
  const wpm = isFinite(wpmRaw) ? Math.round(wpmRaw *2) : 0;

  console.log("맞춘 글자 수:", correctChars);
  console.log("현재 단어 오타 수:", typoInThisWord);
  console.log("전체 글자 수:", totalLength);
  console.log("누적된 오타 수:", updatedTotalTypos);
  console.log("전체 정확도:", overallAccuracy, "%");

  const timelineEntry = {
    timeSec: durationSec,
    wpm,
    accuracy: overallAccuracy,
    typoCount: updatedTotalTypos,
  };

  const updatedTimeline = [...accuracyTimeline, timelineEntry];
  setAccuracyTimeline(updatedTimeline);
  setTotalTypos(updatedTotalTypos); // ✅ 누적 오타 업데이트

  if (currentWordIndex + 1 >= words.length) {
    localStorage.setItem(
      "typingResult",
      JSON.stringify({
        durationSec,
        wpm,
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
    let currentWord = words[currentWordIndex] || "";

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

    //console 찍어봄
    //console.log("조합중?:" + isComposing, "내가친거:" + finalValue, "현재단어:" + currentWord)

  //wpm로직 콘솔
  // 총 입력 글자 수 계산
  const totalTypedChars =
    words.slice(0, currentWordIndex).join("").length + finalValue.length;

  // 걸린 시간 계산
  const endTime = Date.now();
  const durationSec = startTime !== null ? (endTime - startTime) / 1000 : 0;

  // 콘솔 출력
  //console.log("총 입력 글자 수:", totalTypedChars, "걸린 시간:", durationSec);


  const typedWordsCount =
    words.slice(0, currentWordIndex).join(" ").split(/\s+/).filter(Boolean).length + 1;

  //console.log("입력한글자수:", typedWordsCount, "걸린시간:", durationSec);
  //--

  //   // ✅ 영어 입력 중
  //   if (!isComposing && finalValue === currentWord) {
  //     console.log("넘어감-영어");
  //     moveToNextWord(finalValue);
  //   }
  //   // ✅ 한글 입력 중
  //   if (isComposing && finalValue === currentWord) {
  //     console.log("넘어감-한글");
  //     moveToNextWord(finalValue);
  //   }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter") {
    e.preventDefault();  // 엔터 기본 동작 막기 (줄바꿈 방지)
    const currentWord = words[currentWordIndex] || "";
    const finalValue = userInput.slice(0, currentWord.length);
    console.log("엔터 입력됨, 넘어감-------------");
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
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

return (
  <div key={currentWordIndex} className="relative w-full h-full cursor-text" onClick={handleClick}>
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