"use client";
import React from "react";

// 컴포넌트에서 전달받을 props 타입 정의
interface TypingWordsDisplayProps {
  words: string[]; // 전체 단어 배열
  currentWordIndex: number; // 현재 입력 중인 단어의 인덱스
  currentInput: string; // 사용자가 입력한 문자열 (현재 단어 기준)
}

const WORDS_PER_SCREEN = 7; // 한 화면에 보여줄 단어 수
const FIXED_INPUT_INDEX = 3; // 입력창이 고정될 위치 (4번째 단어 자리)

const TypingWord: React.FC<TypingWordsDisplayProps> = ({
  words,
  currentWordIndex,
  currentInput,
}) => {
  const totalWords = words.length;

  // 1. 현재 단어 인덱스에 따라 보여줄 단어 시작 인덱스 결정
  const startIndex =
    currentWordIndex < FIXED_INPUT_INDEX
      ? 0
      : currentWordIndex - FIXED_INPUT_INDEX;

  // 2. 보여줄 단어 구간 자르기
  const endIndex = Math.min(startIndex + WORDS_PER_SCREEN, totalWords);
  const displayedWords = words.slice(startIndex, endIndex);

  // 3. 단어가 7개보다 부족하면 빈 박스로 채우기
  const padding = Array(WORDS_PER_SCREEN - displayedWords.length).fill("");

  // 4. 현재 단어의 입력 위치 계산 (고정 또는 가변)
  const inputBoxIndex =
    currentWordIndex < FIXED_INPUT_INDEX ? currentWordIndex : FIXED_INPUT_INDEX;

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-3 px-4 items-center">
        {/* 5. 단어 박스 7개 렌더링 (단어 + 빈 칸) */}
        {[...displayedWords, ...padding].map((word, idx) => {
          const isCurrent = idx === inputBoxIndex;
          const isEmpty = word === "";

          return (
            <div
              key={idx}
              className={`px-4 py-2 rounded-md shadow-md font-mono text-lg transition-all
                ${isEmpty ? "invisible" : ""}
                ${isCurrent ? "bg-cdark text-white" : "text-gray-400 bg-cdark"}
              `}
              style={{
                minWidth: "80px",
                textAlign: "center",
              }}
            >
              {/* 6. 현재 입력 중인 단어: 글자 단위 비교 렌더링 */}
              {isCurrent ? (
                word.split("").map((char: string, idx: number) => {
                  const typedChar = currentInput[idx];

                  if (typedChar === undefined) {
                    return <span key={idx}>{char}</span>;
                  }

                  const isCorrect = typedChar === char;

                  return (
                    <span
                      key={idx}
                      className={isCorrect ? "text-green-500" : "text-red-500"}
                    >
                      {typedChar}
                    </span>
                  );
                })
              ) : (
                // 7. 입력 중이 아닌 단어: 회색으로 전체 출력
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
