"use client";
import React, { useEffect, useState } from "react";

// 초기 단어 리스트
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

const WORDS_PER_SCREEN = 7; // 한 화면에 보여줄 단어 수
const INPUT_WORD_INDEX = 3; // 가운데 위치할 입력 칸 인덱스

export default function Word() {
  const [words, setWords] = useState<string[]>(initialWords);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [inputMode, setInputMode] = useState<"initial" | "fixed">("initial");
  const [inputPosition, setInputPosition] = useState<number>(0);

  // 현재 화면에 보여줄 단어 계산
  const getDisplayedWords = () => {
    if (currentWordIndex >= words.length) return [];

    const start = Math.max(0, currentWordIndex - INPUT_WORD_INDEX);
    const visibleWords = words.slice(start, start + WORDS_PER_SCREEN);

    const missing = WORDS_PER_SCREEN - visibleWords.length;
    if (missing > 0) {
      return [...visibleWords, ...Array(missing).fill("")];
    }

    return visibleWords;
  };

  // 키 입력 처리
  const handleKeyDown = (e: KeyboardEvent) => {
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    if (e.key === "Backspace") {
      setCurrentInput((prev) => prev.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      const nextInput = currentInput + e.key;
      setCurrentInput(nextInput);

      if (nextInput.length >= currentWord.length) {
        setCurrentInput("");
        const nextWordIndex = currentWordIndex + 1;
        setCurrentWordIndex(nextWordIndex);

        if (inputMode === "initial") {
          if (inputPosition < INPUT_WORD_INDEX) {
            setInputPosition((prev) => prev + 1);
          } else {
            setInputMode("fixed");
          }
        }
      }
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [currentInput, currentWordIndex, inputMode]);

  const displayedWords = getDisplayedWords();

  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <div className="flex gap-[20px] px-4 items-center max-w-6xl justify-center">
        {displayedWords.map((word: string, index: number) => {
          const isInputBox =
            (inputMode === "initial" && index === inputPosition) ||
            (inputMode === "fixed" && index === INPUT_WORD_INDEX);

          const isPadding = word === "";

          return (
            <div
              key={index}
              className={`bg-cdark px-2 py-2 rounded shadow font-d2 text-lg text-center ${
                isPadding ? "invisible" : ""
              }`}
              style={{
                width: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isPadding ? (
                <div style={{ width: "100px" }}></div>
              ) : isInputBox ? (
                <span className="font-d2 text-xl whitespace-pre">
                  {word.split("").map((char: string, charIndex: number) => {
                    const typedChar = currentInput[charIndex];
                    if (typedChar === undefined) {
                      return <span key={charIndex}>{char}</span>;
                    }
                    const isCorrect = typedChar === char;
                    return (
                      <span
                        key={charIndex}
                        className={
                          isCorrect ? "text-green-500" : "text-red-500"
                        }
                      >
                        {typedChar}
                      </span>
                    );
                  })}
                </span>
              ) : (
                <span className="opacity-60">{word}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
