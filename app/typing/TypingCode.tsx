"use client";
import React from "react";

interface TypingAreaProps {
  fullText: string;
  userInput: string;
}

const TypingArea: React.FC<TypingAreaProps> = ({ fullText, userInput }) => {
  return (
    <div className="px-[30px] font-d2 text-[20px] leading-relaxed break-words whitespace-pre-wrap">
      {fullText.split("").map((char, idx) => {
        const typedChar = userInput[idx];
        const isCursor = idx === userInput.length;

        // 줄바꿈 처리
        if (char === "\n") {
          return <br key={idx} />;
        }

        if (typedChar === undefined) {
          return (
            <span key={idx} className="text-gray-400 relative inline-block">
              {isCursor && (
                <span className="blinking-cursor absolute left-0 top-0 w-[1px] h-full bg-white" />
              )}
              {char}
            </span>
          );
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
      })}
    </div>
  );
};

export default TypingArea;
