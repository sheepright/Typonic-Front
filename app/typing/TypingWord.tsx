"use client";
import React from "react";

interface TypingWordsDisplayProps {
  words: string[];
  currentWordIndex: number;
  currentInput: string;
}

const WORDS_PER_SCREEN = 7;
const FIXED_INPUT_INDEX = 3;

const TypingWord: React.FC<TypingWordsDisplayProps> = ({
  words,
  currentWordIndex,
  currentInput,
}) => {
  const totalWords = words.length;

  let displayedWords: string[] = [];

  if (currentWordIndex < FIXED_INPUT_INDEX) {
    // 왼쪽에 빈 칸으로 패딩 추가
    const leftPadding = Array(FIXED_INPUT_INDEX - currentWordIndex).fill("");
    const slicedWords = words.slice(0, WORDS_PER_SCREEN - leftPadding.length);
    displayedWords = [...leftPadding, ...slicedWords];
  } else {
    // 일반적으로 단어를 자르기
    const start = currentWordIndex - FIXED_INPUT_INDEX;
    displayedWords = words.slice(start, start + WORDS_PER_SCREEN);
  }

  // 부족한 경우 오른쪽에 패딩
  if (displayedWords.length < WORDS_PER_SCREEN) {
    const rightPadding = Array(WORDS_PER_SCREEN - displayedWords.length).fill(
      ""
    );
    displayedWords = [...displayedWords, ...rightPadding];
  }

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-3 px-4 items-center">
        {displayedWords.map((word, idx) => {
          const isCurrent = idx === FIXED_INPUT_INDEX;
          const isEmpty = word === "";

          return (
            <div
              key={idx}
              className={`px-4 py-2 rounded-[5px] shadow-lg font-d2 text-[20px] transition-all
                ${isEmpty ? "invisible" : ""}
                ${isCurrent ? "bg-cdark text-white" : "text-gray-400 bg-cdark"}
              `}
              style={{
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              {isCurrent ? (
                word.split("").map((char: string, i: number) => {
                  const typedChar = currentInput[i];
                  if (typedChar === undefined) {
                    return <span key={i}>{char}</span>;
                  }
                  const isCorrect = typedChar === char;
                  return (
                    <span
                      key={i}
                      className={isCorrect ? "text-green-500" : "text-red-500"}
                    >
                      {typedChar}
                    </span>
                  );
                })
              ) : (
                <>{word}</>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypingWord;
