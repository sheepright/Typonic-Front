"use client";

import { useEffect, useState } from "react";
import { generateWords } from "@/app/api/api";

export default function WordMenubar() {
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [selectedCount, setSelectedCount] = useState("10개");

  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [hoveredCount, setHoveredCount] = useState<string | null>(null);

  const menu = [
    "코드 단어 연습",
    "Line",
    "C++",
    "C#",
    "Java",
    "Python",
    "Html",
    "JavaScript",
    "TypeScript",
    "Line",
    "10개",
    "25개",
    "50개",
  ];

  const getCount = (label: string): number => parseInt(label.replace("개", ""));

  useEffect(() => {
    const version = Date.now().toString();

    const fetch = async () => {
      try {
        alert(
          "잠시만 기다려주세요, 최대 1분까지 소요될 수 있습니다.\n단어가 변경된 후 진행하여주세요."
        );
        const res = await generateWords({
          language: selectedLanguage,
          count: getCount(selectedCount),
        });

        localStorage.setItem("typingWords", JSON.stringify(res));
        localStorage.setItem("wordsVersion", version);
      } catch {
        console.error("단어 가져오기 실패");
      }
    };

    fetch();
  }, [selectedLanguage, selectedCount]);

  return (
    <div className="w-[900px] h-[40px] flex justify-center items-center bg-cdark px-4 rounded-[5px] shadow-lg">
      <div className="flex items-center space-x-6">
        {menu.map((item) => {
          if (item === "Line") {
            return (
              <div
                key={item + Math.random()}
                className="w-[1px] h-[15px] bg-white opacity-50 rounded-full"
              />
            );
          }

          const alwaysSelected = item === "코드 단어 연습";

          const isLanguage = [
            "C++",
            "C#",
            "Java",
            "Python",
            "Html",
            "JavaScript",
            "TypeScript",
          ].includes(item);

          const isCount = ["10개", "25개", "50개"].includes(item);

          const isSelected =
            (isLanguage && selectedLanguage === item) ||
            (isCount && selectedCount === item);

          const isActive =
            alwaysSelected ||
            (isLanguage &&
              (hoveredLanguage === item || (!hoveredLanguage && isSelected))) ||
            (isCount &&
              (hoveredCount === item || (!hoveredCount && isSelected)));

          const handleClick = () => {
            if (isLanguage) {
              setSelectedLanguage(item);
            } else if (isCount) {
              setSelectedCount(item);
            }
          };

          const hoverEvents = isLanguage
            ? {
                onMouseEnter: () => setHoveredLanguage(item),
                onMouseLeave: () => setHoveredLanguage(null),
              }
            : isCount
            ? {
                onMouseEnter: () => setHoveredCount(item),
                onMouseLeave: () => setHoveredCount(null),
              }
            : {};

          return (
            <button
              key={item}
              onClick={handleClick}
              {...hoverEvents}
              className={`text-base border-0 bg-transparent font-dung transition-opacity duration-200 text-white text-[15px] ${
                isActive ? "opacity-100" : "opacity-20"
              }`}
              style={isActive ? { WebkitTextStroke: "0.2px white" } : {}}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
