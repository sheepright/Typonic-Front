"use client";
import React from "react";

interface TypingAreaProps {
  fullText: string;
  userInput: string;
}

const TypingArea: React.FC<TypingAreaProps> = ({ fullText, userInput }) => {
  return (
    <div className="font-mono text-xl leading-relaxed break-words whitespace-pre-wrap">
      {fullText.split("").map((char, idx) => {
        const typedChar = userInput[idx];

        if (typedChar === undefined) {
          return (
            <span key={idx} className="text-gray-400">
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
