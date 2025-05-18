"use client";
import React from "react";

interface TypingWordsDisplayProps {
  words: string[];
  currentWordIndex: number;
  currentInput: string;
  inputMode: "initial" | "fixed";
  inputPosition: number;
}

const WORDS_PER_SCREEN = 7;
const INPUT_WORD_INDEX = 3;

export default function TypingWord({
  words,
  currentWordIndex,
  currentInput,
  inputMode,
  inputPosition,
}: TypingWordsDisplayProps) {
  const getDisplayedWords = () => {
    let start = 0;

    if (inputMode === "fixed") {
      start = currentWordIndex - INPUT_WORD_INDEX;
      if (start < 0) start = 0;
    } else {
      start = Math.max(0, currentWordIndex - inputPosition);
    }

    const visibleWords = words.slice(start, start + WORDS_PER_SCREEN);
    const missing = WORDS_PER_SCREEN - visibleWords.length;

    if (missing > 0) {
      return [...visibleWords, ...Array(missing).fill("")];
    }
    return visibleWords;
  };

  const displayedWords = getDisplayedWords();

  return (
    <div className="w-[820px] h-[36px] flex items-center justify-center">
      <div
        className="flex gap-[20px] px-4 items-center max-w-6xl justify-center"
        style={{ userSelect: "none" }}
      >
        {displayedWords.map((word, index) => {
          const isInputBox =
            (inputMode === "initial" && index === inputPosition) ||
            (inputMode === "fixed" && index === INPUT_WORD_INDEX);
          const isPadding = word === "";

          return (
            <div
              key={index}
              className={`bg-cdark px-2 py-2 rounded shadow-lg font-d2 text-lg text-center ${
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
